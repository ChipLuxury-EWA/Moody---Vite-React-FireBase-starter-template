import React, { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, Github, Loader2, Eye, EyeOff, User } from "lucide-react";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const { user, signIn, signUp, signInWithGoogle, sendVerificationEmail, refreshUser, logout, loading, signInWithGithub } =
    useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = isSignUp ? await signUp(email, password) : await signIn(email, password);

    if (result.error) {
      alert(result.error.message);
    } else if (isSignUp && result.user) {
      setVerificationEmailSent(true);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const result = await signInWithGoogle();
    if (result.error) {
      alert(result.error.message);
    }
    setGoogleLoading(false);
  };

  const handleGithubSignIn = async () => {
    setGithubLoading(true);
    const result = await signInWithGithub();
    if (result.error) {
      console.error(result.error);
    }
    setGithubLoading(false);
  };

  const handleResendVerification = async () => {
    const result = await sendVerificationEmail();
    if (result.error) {
      alert(result.error.message);
    } else {
      setVerificationEmailSent(true);
      alert("Verification email sent!");
    }
  };

  const handleCheckVerification = async () => {
    await refreshUser();
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.error) {
      alert(result.error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto text-white">
        <CardHeader>
          <CardTitle className="text-foreground">Welcome!</CardTitle>
          <CardDescription className="text-muted-foreground">You are logged in as {user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-sm">Email Status:</span>
            {user.emailVerified ? (
              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                ✓ Verified
              </Badge>
            ) : (
              <Badge variant="destructive">✗ Unverified</Badge>
            )}
          </div>

          {!user.emailVerified && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Please verify your email address to access all features.</p>
              <div className="flex gap-2">
                <Button onClick={handleResendVerification} variant="outline" size="sm" className="flex-1">
                  Resend Verification
                </Button>
                <Button onClick={handleCheckVerification} variant="outline" size="sm" className="flex-1">
                  Check Status
                </Button>
              </div>
              {verificationEmailSent && (
                <p className="text-sm text-green-600">Verification email sent! Please check your inbox.</p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2 ml-4">
            <Badge variant="secondary" className="text-green-400 border-green-400/50">
              <User className="w-3 h-3 mr-1" />
              {user.displayName || user.email}
            </Badge>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User profile"}
                className="w-8 h-8 rounded-full border border-gray-600"
              />
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto text-white">
      <CardHeader>
        <CardTitle className="text-foreground">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {isSignUp ? "Create a new account" : "Sign in to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 font-medium text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : isSignUp ? (
              "🚀 Sign Up"
            ) : (
              "🔓 Sign In"
            )}
          </Button>
        </form>

        {isSignUp && verificationEmailSent && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-800">Account created! Please check your email for verification instructions.</p>
          </div>
        )}

        <div className="relative flex items-center py-4">
          <div className="flex-1 border-t border-muted-foreground/20"></div>
          <span className="px-4 text-xs uppercase text-muted-foreground bg-card">Or continue with</span>
          <div className="flex-1 border-t border-muted-foreground/20"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            onClick={handleGoogleSignIn} 
            variant="outline" 
            className="w-full h-12 font-medium border-2 hover:border-gray-400 hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95" 
            disabled={googleLoading || loading}
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </>
            )}
          </Button>

          <Button 
            onClick={handleGithubSignIn} 
            variant="outline" 
            className="w-full h-12 font-medium border-2 hover:border-gray-400 hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95" 
            disabled={githubLoading || loading}
          >
            {githubLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </>
            )}
          </Button>
        </div>

        <Button onClick={() => setIsSignUp(!isSignUp)} variant="link" className="w-full">
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </Button>
      </CardContent>
    </Card>
  );
};
