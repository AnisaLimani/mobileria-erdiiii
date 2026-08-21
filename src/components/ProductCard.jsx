import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = product.image
    ? product.image
    : 'https://via.placeholder.com/600x400?text=Foto+nuk+gjendet';

  return (
    <>
      {/* =========================
          PRODUCT CARD
      ========================= */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
      >

        {/* IMAGE */}
        <div className="relative h-64 overflow-hidden bg-gray-200">

          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/600x400?text=Foto+nuk+gjendet';
            }}
          />

          {/* CATEGORY */}
          <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

        </div>
      </div>


      {/* =========================
          IMAGE POPUP
      ========================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-11 h-11 rounded-full bg-white/90 text-gray-800 text-2xl flex items-center justify-center hover:bg-white transition duration-200 shadow-lg z-10"
            aria-label="Mbyll foton"
          >
            ✕
          </button>


          {/* IMAGE CONTAINER */}
          <div
            className="relative max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={imageUrl}
              alt={product.name}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://via.placeholder.com/600x400?text=Foto+nuk+gjendet';
              }}
            />

          </div>

        </div>
      )}
    </>
  );
};

export default ProductCard;