import { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  where,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useFirestore = (collectionName: string) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add document
  const addDocument = async (data: DocumentData) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
      return { id: docRef.id, error: null };
    } catch (err) {
      setError((err as Error).message);
      return { id: null, error: err as Error };
    }
  };

  // Update document
  const updateDocument = async (id: string, data: Partial<DocumentData>) => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
      return { error: null };
    } catch (err) {
      setError((err as Error).message);
      return { error: err as Error };
    }
  };

  // Delete document
  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      return { error: null };
    } catch (err) {
      setError((err as Error).message);
      return { error: err as Error };
    }
  };

  // Get single document
  const getDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
      } else {
        return { data: null, error: new Error("Document not found") };
      }
    } catch (err) {
      setError((err as Error).message);
      return { data: null, error: err as Error };
    }
  };

  // Get all documents
  const getDocuments = async (constraints?: QueryConstraint[]) => {
    try {
      setLoading(true);
      const q = constraints ? query(collection(db, collectionName), ...constraints) : collection(db, collectionName);

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocuments(docs);
      setLoading(false);
      return { data: docs, error: null };
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      return { data: [], error: err as Error };
    }
  };

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
  };
};

// Real-time subscription hook
export const useFirestoreRealtime = (collectionName: string, constraints?: QueryConstraint[]) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = constraints ? query(collection(db, collectionName), ...constraints) : collection(db, collectionName);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docs);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, constraints]);

  return { documents, loading, error };
};

// Real-time subscription hook for posts with privacy support
export const usePostsRealtime = (userId: string | undefined, constraints?: QueryConstraint[]) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const unSubscribers: (() => void)[] = [];
    const postsMap = new Map<string, DocumentData>();
    let loadingQueries = 2;

    const updateDocuments = () => {
      loadingQueries--;
      if (loadingQueries === 0) {
        const sortedDocs = Array.from(postsMap.values()).sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt) || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt) || new Date(0);
          return bTime.getTime() - aTime.getTime();
        });
        setDocuments(sortedDocs);
        setLoading(false);
      }
    };

    // Query 1: User's own posts (all posts by this user, regardless of privacy)
    const userPostsQuery = constraints
      ? query(collection(db, "posts"), where("authorId", "==", userId), ...constraints)
      : query(collection(db, "posts"), where("authorId", "==", userId));

    const unsubscribe1 = onSnapshot(
      userPostsQuery,
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          postsMap.set(doc.id, { id: doc.id, ...doc.data() });
        });
        updateDocuments();
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    unSubscribers.push(unsubscribe1);

    // Query 2: All public posts (isPrivate is false or doesn't exist)
    const publicPostsQuery = constraints
      ? query(collection(db, "posts"), where("isPrivate", "==", false), ...constraints)
      : query(collection(db, "posts"), where("isPrivate", "==", false));

    const unsubscribe2 = onSnapshot(
      publicPostsQuery,
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          postsMap.set(doc.id, { id: doc.id, ...doc.data() });
        });
        updateDocuments();
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    unSubscribers.push(unsubscribe2);

    return () => {
      unSubscribers.forEach((unSub) => unSub());
    };
  }, [userId, constraints]);

  return { documents, loading, error };
};
