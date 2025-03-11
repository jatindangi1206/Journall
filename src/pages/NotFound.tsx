
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-2xl px-4 animate-fade-in">
          <h1 className="font-serif text-featured mb-6">404</h1>
          <h2 className="font-serif text-headline mb-8">Page Not Found</h2>
          <p className="font-serif text-body text-nyt-gray-dark mb-10">
            We couldn't find the page you were looking for. It may have been moved, deleted, or perhaps never existed.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-nyt-black text-white font-sans text-sm transition-colors hover:bg-nyt-gray-dark"
          >
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
