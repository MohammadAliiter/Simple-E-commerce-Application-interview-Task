import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    
  };

  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold">
            <span className="text-yellow-300">Lux</span>Shop
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-300 transition-colors duration-300">Home</Link>
            <Link to="/cart" className="relative hover:text-yellow-300 transition-colors duration-300">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/my-orders" className="hover:text-yellow-300 transition-colors duration-300">My Orders</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="flex items-center space-x-2 bg-transparent hover:bg-white hover:text-purple-800 text-white px-4 py-2 border border-white rounded-full transition-colors duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 px-4 py-2 rounded-full transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

