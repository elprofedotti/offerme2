import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Product {
  id: string;
  title: string;
  price: number;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (user) {
        const q = query(collection(db, 'products'), where('seller', '==', user.email));
        const querySnapshot = await getDocs(q);
        const userProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product));
        setProducts(userProducts);
      }
    };

    fetchUserProducts();
  }, [user]);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <p className="mb-4">Email: {user.email}</p>
      <h3 className="text-xl font-semibold mb-2">Your Products</h3>
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="border p-2 rounded">
              <span className="font-medium">{product.title}</span> - ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't listed any products yet.</p>
      )}
    </div>
  );
};

export default Profile;