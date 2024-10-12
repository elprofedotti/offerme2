import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, MessageCircle } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productDoc = doc(db, 'products', id);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() } as Product);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
      <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-gray-600 mb-2">Seller: {product.seller}</p>
      <div className="flex items-center text-gray-600 mb-4">
        <MapPin className="mr-2" />
        <span>Location: {product.location.latitude.toFixed(6)}, {product.location.longitude.toFixed(6)}</span>
      </div>
      {user && user.email !== product.seller && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          <MessageCircle className="inline-block mr-2" />
          Chat with Seller
        </button>
      )}
    </div>
  );
};

export default ProductDetails;