# Firebase Setup Instructions

Firebase has been integrated into your React app! Here's how to complete the setup:

## 1. Create Environment Variables

Create a `.env` file in your project root with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=measurement_id
```

## 2. Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click "Add app" and choose "Web"
4. Register your app and copy the configuration values to your `.env` file

## 3. Enable Authentication (Optional)

If you want to use authentication:

1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "Email/Password" and/or "Google" providers
3. For Google sign-in, you'll need to configure OAuth consent screen

## 4. Set up Firestore Database & Security

### Initial Database Setup

1. In Firebase Console, go to "Firestore Database"
2. Create database in **test mode** initially
3. Choose a location close to your users

### Deploy Security Rules (CRITICAL!)

Your app includes comprehensive security rules in `firestore.rules`. Deploy them immediately:

**Option 1: Firebase Console (GUI)**
1. Go to Firestore Database > Rules tab
2. Copy the contents of `firestore.rules` into the editor
3. Click "Publish"

**Option 2: Firebase CLI (Recommended)**
```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (one-time setup)
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

### Security Features Implemented

✅ **Authentication Required**: All operations require valid user authentication
✅ **Ownership Control**: Users can only edit/delete their own posts  
✅ **Data Validation**: Strict validation on post content, length limits, required fields
✅ **Immutable Fields**: Critical fields like authorId and createdAt cannot be modified
✅ **Input Sanitization**: Character limits prevent spam and abuse
✅ **Real-time Security**: Rules apply to both REST API and real-time subscriptions

### Security Rule Breakdown

- **Read Access**: Authenticated users can read all posts (social feed)
- **Create Posts**: Validates all required fields, enforces authorId = current user
- **Update Posts**: Only post owners can update title, content, mood (protects metadata)
- **Delete Posts**: Only post owners can delete their posts
- **User Profiles**: Ready for future user profile features with proper access control

## 5. Usage Examples

### Authentication
```tsx
import { LoginForm } from '@/components/LoginForm';
import { useAuthContext } from '@/components/AuthProvider';

// Use the LoginForm component
<LoginForm />

// Or use the auth context directly
const { user, signIn, signUp, logout } = useAuthContext();
```

### Firestore
```tsx
import { useFirestore, useFirestoreRealtime } from '@/hooks/useFirestore';
import { orderBy } from 'firebase/firestore';

// Basic usage
const { addDocument, updateDocument, deleteDocument, getDocuments } = useFirestore('todos');

// Real-time updates
const { documents, loading, error } = useFirestoreRealtime('todos', [orderBy('createdAt', 'desc')]);

// Add a document
await addDocument({ title: 'New Todo', completed: false, createdAt: new Date() });

// Update a document
await updateDocument('docId', { completed: true });

// Delete a document
await deleteDocument('docId');
```

## 6. What's Included

- **Firebase Configuration**: `src/lib/firebase.ts`
- **Authentication Hook**: `src/hooks/useAuth.ts`
- **Firestore Hooks**: `src/hooks/useFirestore.ts`
- **Auth Provider**: `src/components/AuthProvider.tsx`
- **Login Form Example**: `src/components/LoginForm.tsx`

## 7. Firebase Services Available

- **Authentication**: Sign up, sign in, Google sign-in, logout
- **Firestore**: CRUD operations, real-time updates, queries
- **Storage**: File upload/download (configured but not implemented)

## 8. Next Steps

1. Add your Firebase config to `.env`
2. Enable the services you need in Firebase Console
3. Start using the hooks and components in your app
4. Customize the LoginForm component to match your design

Your app is now ready to use Firebase! 🚀 