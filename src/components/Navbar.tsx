import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">OfferMe</Link>
        <div className="space-x-4">
          <Link to="/products" className="hover:text-blue-200">Products</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-200">
                <User className="inline-block mr-1" size={18} />
                Profile
              </Link>
              <button onClick={logout} className="hover:text-blue-200">
                <LogOut className="inline-block mr-1" size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="hover:text-blue-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;