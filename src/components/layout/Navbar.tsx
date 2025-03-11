import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentUser, logout } from '@/lib/authService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDate] = useState(new Date());
  const user = getCurrentUser();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuth = () => {
    if (user) {
      logout();
      toast.success('Logged out successfully');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="w-full">
      {/* Top date and subscription bar */}
      <div className="w-full bg-white border-b border-nyt-gray-light">
        <div className="container-fluid py-2 flex justify-between items-center">
          <p className="text-caption font-sans text-nyt-gray">{formatDate(currentDate)}</p>
          {user ? (
            <span className="text-caption font-sans text-nyt-blue">Welcome, {user.name}</span>
          ) : (
            <Link to="/subscribe" className="text-caption font-sans text-nyt-blue animated-link">Subscribe Now</Link>
          )}
        </div>
      </div>

      {/* Main navigation */}
      <nav className={cn(
        "w-full bg-white transition-all duration-300 border-b border-nyt-gray-light z-50",
        isScrolled ? "sticky top-0 shadow-sm" : ""
      )}>
        <div className="container-fluid py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu button */}
            <button 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2 transition-transform duration-300 hover:scale-105"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="font-serif font-bold text-2xl tracking-tight animate-fade-in">The Journal</h1>
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center space-x-4">
              <button aria-label="Search" className="p-2 transition-transform duration-300 hover:scale-105">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={handleAuth}
                aria-label={user ? 'Logout' : 'Login'}
                className="p-2 transition-transform duration-300 hover:scale-105"
              >
                {user ? (
                  <LogOut className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>
              {user && (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="hidden md:inline-flex">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex justify-center mt-4 space-x-8 overflow-x-auto">
            <Link to="/section/politics" className="nav-link">Politics</Link>
            <Link to="/section/business" className="nav-link">Business</Link>
            <Link to="/section/technology" className="nav-link">Technology</Link>
            <Link to="/section/science" className="nav-link">Science</Link>
            <Link to="/section/health" className="nav-link">Health</Link>
            <Link to="/section/arts" className="nav-link">Arts</Link>
            <Link to="/section/style" className="nav-link">Style</Link>
            <Link to="/section/travel" className="nav-link">Travel</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-50 transition-transform duration-300 transform", 
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="container-fluid py-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif font-bold text-xl">Menu</h2>
            <button 
              onClick={toggleMenu}
              aria-label="Close menu"
              className="p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {user && (
              <Link 
                to="/dashboard" 
                className="text-headline font-serif hover:text-nyt-blue transition-colors" 
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            )}
            <Link to="/section/politics" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Politics</Link>
            <Link to="/section/business" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Business</Link>
            <Link to="/section/technology" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Technology</Link>
            <Link to="/section/science" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Science</Link>
            <Link to="/section/health" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Health</Link>
            <Link to="/section/arts" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Arts</Link>
            <Link to="/section/style" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Style</Link>
            <Link to="/section/travel" className="text-headline font-serif hover:text-nyt-blue transition-colors" onClick={toggleMenu}>Travel</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
