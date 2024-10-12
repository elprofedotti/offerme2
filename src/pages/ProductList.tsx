import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="border p-4 rounded hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">Seller: {product.seller}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;