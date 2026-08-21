import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';

const Kuzhina = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost/mobileria-api/api';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/get_products.php?category=Kuzhina`
      );

      if (!response.ok) {
        throw new Error('Gabim gjatë marrjes së produkteve');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
  <div className="container mx-auto px-4 pt-8 page-content">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-amber-900 mb-2">
             Kuzhina
          </h1>

          <p className="text-gray-600 text-lg">
            Mobilje funksionale dhe elegante për gatimin tuaj
          </p>

          <p className="text-sm text-gray-400 mt-2">
            {products.length} produkte
          </p>

        </div>


        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center items-center py-20">
            <div className="text-center">

              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-800 mx-auto mb-4"></div>

              <p className="text-gray-600">
                Duke ngarkuar produktet...
              </p>

            </div>
          </div>

        ) : products.length === 0 ? (

          /* NO PRODUCTS */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-16 px-6 text-center">

            <div className="text-6xl mb-4">
              🍳
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Nuk ka produkte
            </h2>

            <p className="text-gray-500">
              Për momentin nuk ka produkte të kategorisë Kuzhina.
            </p>

          </div>

        ) : (

          /* PRODUCTS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Kuzhina;