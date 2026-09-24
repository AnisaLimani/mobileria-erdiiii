import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Divane = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/get_products.php?category=Divane`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="pt-24 min-h-screen bg-gray-50">
  <div className="container mx-auto px-4 pt-8 page-content">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2"> Divane</h1>
          <p className="text-gray-600 text-lg">
            Relaksohuni me stil — komoditet i përkryer
          </p>
          <p className="text-sm text-gray-400 mt-1">{products.length} produkte</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Duke ngarkuar...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Divane;