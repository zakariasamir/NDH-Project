import { useNavigate } from "react-router-dom";

function ProductCard({ product, index }) {
  const navigate = useNavigate();
  const rating = product.rating || 4.5;

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl duration-300 transition-all border border-gray-100 hover:border-gray-200 group"
      onClick={() => navigate(`/product/${index}`)}
    >
      {/* Image Container with Hover Effects */}
      <div className="relative aspect-[4/5] overflow-hidden cursor-pointer">
        <div className="relative h-full w-full">
          <img
            src={product.image || "/api/placeholder/400/500"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              className="w-full bg-white cursor-pointer text-gray-900 font-medium py-3 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-50 shadow-md text-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${index}`);
              }}
            >
              Voir les détails
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md animate-pulse">
                NOUVEAU
              </span>
            )}
            {product.discount && (
              <span className="bg-rose-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
            {product.title}
          </h2>
          <div className="flex flex-col items-end min-w-max">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice} DH
              </span>
            )}
            <span className="font-bold text-indigo-600 text-lg">
              {product.price} DH
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          <div className="flex mr-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= rating ? "text-amber-400" : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({Math.round(rating * 10) / 10})
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {product.category && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
              {product.category}
            </span>
          )}
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Button
        <button 
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Ajouter au panier
        </button> */}
      </div>
    </div>
  );
}

export default ProductCard;
