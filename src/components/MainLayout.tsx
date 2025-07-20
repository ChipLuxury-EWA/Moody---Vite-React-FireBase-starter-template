import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, User, LogIn, Github, Code, Menu, X } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Outlet } from "react-router";
import { useState } from "react";

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* PWA-aware header with safe area for notch */}
      <header
        className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              <span className="text-lg sm:text-xl font-bold text-white hidden min-[480px]:block">Moody</span>
              <span className="text-lg sm:text-xl font-bold text-white min-[480px]:hidden">M</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/">
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  size="sm"
                  className={`${
                    isActive("/") ? "bg-blue-500 hover:bg-blue-600" : "text-gray-300 hover:text-white hover:bg-gray-700"
                  } transition-colors`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant={isActive("/login") ? "default" : "ghost"}
                  size="sm"
                  className={`${
                    isActive("/login") ? "bg-blue-500 hover:bg-blue-600" : "text-gray-300 hover:text-white hover:bg-gray-700"
                  } transition-colors font-medium px-4 py-2 rounded-lg shadow-sm`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>

              <Link to="/moody">
                <Button
                  variant={isActive("/moody") ? "default" : "ghost"}
                  size="sm"
                  className={`${
                    isActive("/moody") ? "bg-blue-500 hover:bg-blue-600" : "text-gray-300 hover:text-white hover:bg-gray-700"
                  } transition-colors`}
                >
                  Moody
                </Button>
              </Link>

              {user ? (
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant="secondary" className="text-green-400 border-green-400/50 hidden lg:flex">
                    <User className="w-3 h-3 mr-1" />
                    {user.displayName || user.email?.split("@")[0]}
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
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm"
                  >
                    Logout
                  </Button>
                </div>
              ) : null}
            </nav>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-gray-700" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700/50">
              <div className="flex flex-col space-y-2">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive("/") ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive("/") ? "bg-blue-500 hover:bg-blue-600" : "text-gray-300 hover:text-white hover:bg-gray-700"
                    } transition-colors`}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>

                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive("/login") ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive("/login") ? "bg-blue-500 hover:bg-blue-600" : "text-gray-300 hover:text-white hover:bg-gray-700"
                    } transition-colors font-medium shadow-sm`}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>

                <Link to="/moody" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive("/moody") ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive("/moody") ? "bg-blue-500 hover:bg-blue-600" : "text-gray-300 hover:text-white hover:bg-gray-700"
                    } transition-colors`}
                  >
                    Moody
                  </Button>
                </Link>

                {user && (
                  <div className="pt-2 border-t border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-3 px-3">
                      <Badge variant="secondary" className="text-green-400 border-green-400/50">
                        <User className="w-3 h-3 mr-1" />
                        {user.displayName || user.email?.split("@")[0]}
                      </Badge>
                      {user.photoURL && (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User profile"}
                          className="w-8 h-8 rounded-full border border-gray-600"
                        />
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 font-medium shadow-sm"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <Outlet />
      </main>

      <footer
        className="bg-gray-900/50 border-t border-gray-700/50 mt-16"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Moody PWA</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  window.open("https://github.com/ChipLuxury-EWA", "_blank");
                }}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <div className="text-center">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent font-bold text-sm">
                  Built by Port2Tech
                </span>
                <div className="text-gray-500 text-xs mt-1">React 19 & TypeScript</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
