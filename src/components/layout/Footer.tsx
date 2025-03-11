
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-nyt-gray-light mt-16 pt-12 pb-8 animate-fade-in">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">News</h3>
            <ul className="space-y-3">
              <li><Link to="/section/politics" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Politics</Link></li>
              <li><Link to="/section/business" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Business</Link></li>
              <li><Link to="/section/technology" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Technology</Link></li>
              <li><Link to="/section/science" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Science</Link></li>
              <li><Link to="/section/health" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Health</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/section/arts" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Arts</Link></li>
              <li><Link to="/section/style" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Style</Link></li>
              <li><Link to="/section/travel" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Travel</Link></li>
              <li><Link to="/section/opinion" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Opinion</Link></li>
              <li><Link to="/section/books" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Books</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">About</Link></li>
              <li><Link to="/contact" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Contact Us</Link></li>
              <li><Link to="/careers" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Careers</Link></li>
              <li><Link to="/advertise" className="text-nyt-gray hover:text-nyt-blue text-sm font-sans animated-link">Advertise</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-sm font-sans text-nyt-gray-dark mb-4">Get unlimited access to quality journalism.</p>
            <Link to="/subscribe" className="inline-block px-6 py-2 bg-nyt-black text-white font-sans text-sm transition-colors hover:bg-nyt-gray-dark">
              Subscribe Now
            </Link>
          </div>
        </div>
        
        <div className="heading-divider"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          <div className="mb-4 md:mb-0">
            <h2 className="font-serif font-bold text-xl">The Journal</h2>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs font-sans text-nyt-gray-dark mb-2">
              © {currentYear} The Journal. All Rights Reserved.
            </p>
            <div className="flex space-x-4 justify-center md:justify-end">
              <Link to="/privacy" className="text-xs font-sans text-nyt-gray-dark hover:text-nyt-blue animated-link">Privacy Policy</Link>
              <Link to="/terms" className="text-xs font-sans text-nyt-gray-dark hover:text-nyt-blue animated-link">Terms of Service</Link>
              <Link to="/cookies" className="text-xs font-sans text-nyt-gray-dark hover:text-nyt-blue animated-link">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
