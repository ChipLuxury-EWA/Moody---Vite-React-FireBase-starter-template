import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginForm } from "@/components/LoginForm";
import { Shield, Lock, Key, Users, ArrowLeft, User, Edit } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    if (user && (displayName || photoURL)) {
      setIsUpdating(true);
      try {
        await updateUserProfile(displayName || user.displayName || "", photoURL || user.photoURL || "");
        setDisplayName("");
        setPhotoURL("");
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Authentication",
      description: "Firebase Auth with email/password and social logins",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Email Verification",
      description: "Built-in email verification for new accounts",
    },
    {
      icon: <Key className="w-5 h-5" />,
      title: "Password Reset",
      description: "Secure password reset functionality",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Social Login",
      description: "Google and GitHub authentication support",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Firebase Authentication
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience our complete Firebase authentication system with email/password login, social authentication, and secure user management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-blue-400" />
                  Try Authentication
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Test the complete authentication flow with real Firebase integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Features</CardTitle>
                <CardDescription className="text-gray-300">
                  Everything you need for secure user authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-300">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {user && <motion.div variants={itemVariants} className="mb-16">
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <User className="w-6 h-6 mr-2 text-purple-400" />
                Profile Update Showcase
              </CardTitle>
              <CardDescription className="text-gray-300">
                Update your profile information with Firebase Auth.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {user && (
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">Current Profile:</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.displayName || 'No display name'}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Display Name
                    </label>
                    <Input
                      type="text"
                      placeholder={user?.displayName || "Enter display name"}
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      disabled={!user}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Photo URL
                    </label>
                    <Input
                      type="url"
                      placeholder={user?.photoURL || "Enter photo URL"}
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      disabled={!user}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={!user || (!displayName && !photoURL) || isUpdating}
                    className="bg-purple-500 hover:bg-purple-600 text-white w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-400">
                    {!user ? 'Sign in first to test profile updates' : 
                     (!displayName && !photoURL) ? 'Enter display name or photo URL to update' : 
                     'Click to update your profile information'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>}

        <motion.div variants={itemVariants} className="mt-16">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30 max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Integration Ready</CardTitle>
              <CardDescription className="text-gray-300">
                This authentication system is fully integrated with Firebase and ready for production use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Demo
                  </Link>
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-800">
                  <Shield className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  </div>
  );
};

export default LoginPage; 