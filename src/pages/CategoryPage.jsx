import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_URL = 'http://localhost/mobileria-api/api';

const CategoryPage = () => {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOAD CATEGORY + PRODUCTS
  // =========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // =====================================
        // GET CATEGORIES
        // =====================================

        const categoryResponse = await fetch(
          `${API_URL}/get_categories.php`
        );

        if (!categoryResponse.ok) {
          throw new Error(
            'Category API error: ' + categoryResponse.status
          );
        }

        const categoryData = await categoryResponse.json();

        if (
          !categoryData.success ||
          !Array.isArray(categoryData.categories)
        ) {
          throw new Error('Invalid categories response');
        }

        // =====================================
        // FIND CURRENT CATEGORY
        // =====================================

        const foundCategory = categoryData.categories.find(
          (item) => String(item.id) === String(id)
        );

        if (!foundCategory) {
          setCategory(null);
          setProducts([]);
          return;
        }

        setCategory(foundCategory);

        // =====================================
        // GET PRODUCTS
        // =====================================

        const productsResponse = await fetch(
          `${API_URL}/get_products.php`
        );

        if (!productsResponse.ok) {
          throw new Error(
            'Products API error: ' + productsResponse.status
          );
        }

        const productsData = await productsResponse.json();

        if (!Array.isArray(productsData)) {
          throw new Error('Invalid products response');
        }

        // =====================================
        // FILTER PRODUCTS
        // =====================================

        const filteredProducts = productsData.filter(
          (product) =>
            product.category === foundCategory.name
        );

        setProducts(filteredProducts);

      } catch (error) {
        console.error(
          'Error loading category:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-8 page-content">
          <div className="text-center text-gray-600">
            Duke ngarkuar...
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // CATEGORY NOT FOUND
  // =========================================

  if (!category) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-8 page-content">

          <div className="text-center py-20">

            <div className="text-5xl mb-4">
              😕
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Kategoria nuk u gjet
            </h1>

            <p className="text-slate-500 mt-2">
              Kjo kategori nuk ekziston.
            </p>

          </div>

        </div>
      </div>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="pt-24 min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 pt-8 page-content">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            {category.name}
          </h1>

          <p className="text-gray-600 text-lg">
            Produktet tona në kategorinë {category.name}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            {products.length} produkte
          </p>

        </div>


        {/* =====================================
            PRODUCTS
        ===================================== */}

        {products.length === 0 ? (

          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

            <div className="text-5xl mb-4">
              🪑
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Nuk ka produkte akoma
            </h2>

            <p className="text-slate-500 mt-2">
              Nuk ka produkte të vendosura në këtë kategori.
            </p>

          </div>

        ) : (

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

export default CategoryPage;