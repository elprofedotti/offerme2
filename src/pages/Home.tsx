import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to OfferMe</h1>
      <p className="text-xl mb-8">Find great deals or sell your products!</p>
      <div className="flex justify-center space-x-4">
        <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          <ShoppingBag className="inline-block mr-2" />
          Browse Products
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
          <Users className="inline-block mr-2" />
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default Home;