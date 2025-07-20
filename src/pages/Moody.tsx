import React, { useState } from "react";
import { useFirestore, usePostsRealtime } from "@/hooks/useFirestore";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { orderBy, serverTimestamp } from "firebase/firestore";
import { POSTS_COLLECTION } from "@/constants/entities.constants";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: { toDate: () => Date } | Date;
  updatedAt: { toDate: () => Date } | Date;
  mood: string;
  isPrivate?: boolean;
}

interface MoodOption {
  emoji: string;
  text: string;
}

const Moody = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊");
  const [isPrivate, setIsPrivate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");
  const [editIsPrivate, setEditIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addDocument, updateDocument, deleteDocument } = useFirestore(POSTS_COLLECTION);
  const {
    documents: posts,
    loading: postsLoading,
    error,
  } = usePostsRealtime(user?.uid, [orderBy("createdAt", "desc")]);

  const moods: MoodOption[] = [
    { emoji: "😰", text: "Awful" },
    { emoji: "😢", text: "Bad" },
    { emoji: "😴", text: "Meh" },
    { emoji: "😊", text: "Good" },
    { emoji: "🥳", text: "Amazing" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !user) return;

    setLoading(true);
    const newPost = {
      title: title.trim(),
      content: content.trim(),
      author: user.displayName || user.email || "Anonymous",
      authorId: user.uid,
      mood,
      isPrivate,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const { error } = await addDocument(newPost);
    if (!error) {
      setTitle("");
      setContent("");
      setMood("😊");
      setIsPrivate(false);
    }
    setLoading(false);
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditMood(post.mood);
    setEditIsPrivate(post.isPrivate || false);
  };

  const handleUpdate = async (id: string) => {
    if (!editTitle.trim() || !editContent.trim()) return;

    const { error } = await updateDocument(id, {
      title: editTitle.trim(),
      content: editContent.trim(),
      mood: editMood,
      isPrivate: editIsPrivate,
      updatedAt: serverTimestamp(),
    });

    if (!error) {
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
      setEditMood("");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDocument(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setEditMood("");
    setEditIsPrivate(false);
  };

  const formatDate = (date: { toDate: () => Date } | Date) => {
    if (!date) return "";
    const d = "toDate" in date ? date.toDate() : date;
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 text-white">
      {/* Header */}
      <div className="text-center space-y-2 px-2">
        <h1 className="text-3xl sm:text-4xl font-bold">Moody Posts</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Share your thoughts and feelings with the world</p>
        <Badge variant="outline" className="mt-4">
          Firestore Demo: Real-time CRUD Operations
        </Badge>
      </div>

      {/* Stats */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Firestore Features Demonstrated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <p className="text-sm font-medium">Create Posts</p>
              <p className="text-xs text-muted-foreground">addDocument()</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">🔄</div>
              <p className="text-sm font-medium">Real-time Updates</p>
              <p className="text-xs text-muted-foreground">onSnapshot()</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">✏️</div>
              <p className="text-sm font-medium">Edit Posts</p>
              <p className="text-xs text-muted-foreground">updateDocument()</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-red-600">🗑️</div>
              <p className="text-sm font-medium">Delete Posts</p>
              <p className="text-xs text-muted-foreground">deleteDocument()</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Post Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Share what's on your mind</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium mb-2.5 block">
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="What's this post about?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mood" className="text-sm font-medium mb-2.5 block">
                  Mood
                </label>
                {/* Mobile-optimized mood selector */}
                <div className="grid grid-cols-5 gap-2 sm:flex sm:gap-3 sm:flex-wrap sm:justify-center">
                  {moods.map((m) => (
                    <Button
                      key={m.emoji}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setMood(m.emoji)}
                      className={`
                        flex flex-col items-center gap-1 h-16 sm:h-20 py-2 sm:py-3 px-2 sm:px-4 w-full sm:w-20 transition-all duration-200 ease-in-out
                        ${
                          mood === m.emoji
                            ? "shadow-md border-primary border-2 bg-primary/10 scale-105"
                            : "opacity-60 hover:opacity-90 border-border hover:scale-105"
                        }
                      `}
                    >
                      <span className={`text-lg sm:text-2xl ${mood === m.emoji ? "scale-110" : ""} transition-transform`}>{m.emoji}</span>
                      <span className="text-xs font-medium text-center leading-tight">{m.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium mb-2.5 block">Privacy</label>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPrivate(false)}
                    className={`
                      flex items-center gap-2 justify-center transition-all duration-200 ease-in-out h-12 sm:h-auto
                      ${
                        !isPrivate
                          ? "shadow-md border-primary border-2 bg-primary/10 scale-105"
                          : "opacity-60 hover:opacity-90 border-border hover:scale-105"
                      }
                    `}
                  >
                    <span>🌍</span>
                    <span className="text-sm font-medium">Public</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPrivate(true)}
                    className={`
                      flex items-center gap-2 justify-center transition-all duration-200 ease-in-out h-12 sm:h-auto
                      ${
                        isPrivate
                          ? "shadow-md border-primary border-2 bg-primary/10 scale-105"
                          : "opacity-60 hover:opacity-90 border-border hover:scale-105"
                      }
                    `}
                  >
                    <span>🔒</span>
                    <span className="text-sm font-medium">Private</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isPrivate ? "Only you can see this post" : "Everyone can see this post"}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium mb-2.5 block">
                Content
              </label>
              <textarea
                id="content"
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !user} 
              className="w-full h-12 sm:h-10 font-medium text-base sm:text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Creating..." : "✨ Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Posts</h2>

        {postsLoading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading posts...</p>
          </div>
        )}

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {!postsLoading && posts.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
            </CardContent>
          </Card>
        )}

        {(posts as Post[]).map((post: Post) => (
          <Card key={post.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{post.mood}</span>
                  <div>
                    {editingId === post.id ? (
                      <div className="space-y-2">
                        <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="font-semibold" />
                        <div className="grid grid-cols-5 gap-1 sm:flex sm:gap-2">
                          {moods.map((m) => (
                            <Button
                              key={m.emoji}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditMood(m.emoji)}
                              className={`
                                flex flex-col items-center gap-1 h-14 sm:h-16 py-1 sm:py-2 px-1 sm:px-2 w-full sm:w-16 transition-all duration-200 ease-in-out
                                ${
                                  editMood === m.emoji
                                    ? "shadow-md border-primary border-2 bg-primary/10 scale-105"
                                    : "opacity-60 hover:opacity-90 border-border hover:scale-105"
                                }
                              `}
                            >
                              <span className={`text-sm sm:text-lg ${editMood === m.emoji ? "scale-110" : ""} transition-transform`}>{m.emoji}</span>
                              <span className="text-xs font-medium text-center leading-tight">{m.text}</span>
                            </Button>
                          ))}
                        </div>
                        <div className="mt-3">
                          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditIsPrivate(false)}
                              className={`
                                flex items-center gap-1 justify-center py-2 px-2 h-10 sm:h-8 transition-all duration-200 ease-in-out
                                ${
                                  !editIsPrivate
                                    ? "shadow-md border-primary border-2 bg-primary/10 scale-105"
                                    : "opacity-60 hover:opacity-90 border-border hover:scale-105"
                                }
                              `}
                            >
                              <span className="text-xs">🌍</span>
                              <span className="text-xs font-medium">Public</span>
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditIsPrivate(true)}
                              className={`
                                flex items-center gap-1 justify-center py-2 px-2 h-10 sm:h-8 transition-all duration-200 ease-in-out
                                ${
                                  editIsPrivate
                                    ? "shadow-md border-primary border-2 bg-primary/10 scale-105"
                                    : "opacity-60 hover:opacity-90 border-border hover:scale-105"
                                }
                              `}
                            >
                              <span className="text-xs">🔒</span>
                              <span className="text-xs font-medium">Private</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        {post.isPrivate && (
                          <Badge variant="secondary" className="text-xs">
                            🔒 Private
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardDescription className="mt-1">
                      by {post.author} • {formatDate(post.createdAt)}
                      {post.updatedAt && post.updatedAt !== post.createdAt && (
                        <span className="text-xs"> • edited {formatDate(post.updatedAt)}</span>
                      )}
                    </CardDescription>
                  </div>
                </div>

                {user && user.uid === post.authorId && (
                  <div className="flex gap-2">
                    {editingId === post.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleUpdate(post.id)}
                          disabled={!editTitle.trim() || !editContent.trim()}
                        >
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editingId === post.id ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Moody;
