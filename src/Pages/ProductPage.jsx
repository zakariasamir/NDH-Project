import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useSWR from "swr";

function ProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: products,
    error,
    isLoading,
  } = useSWR(
    "https://script.google.com/macros/s/AKfycbwlpSyRsHsPRSuHBY5s8rM_fe_odp8_haIKaEDqtlVLnKJz_86XJBGK5zJ6oPbahg_HDw/exec",
    fetcher
  );

  const whatsappNumber = "212612345678"; // Moroccan format

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !products || !products[id]) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Produit introuvable
        </h2>
        <p className="text-gray-600 mb-8">
          Le produit que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-amber-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const product = products[id];

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par votre produit "${product.title}" au prix de ${product.price} DH. Est-il toujours disponible ?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const similarProducts = products
    .filter(
      (p, idx) =>
        idx !== parseInt(id) &&
        (p.category === product.category || !product.category)
    )
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-amber-600 transition-colors">
          Accueil
        </Link>
        <svg
          className="mx-2 w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-800 font-medium">{product.title}</span>
      </nav>

      {/* Product Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 relative">
            <div className="aspect-square bg-gray-100">
              <img
                src={product.image || "/api/placeholder/800/800"}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                NOUVEAU
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:w-1/2">
            {product.category && (
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex text-amber-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm">(25 avis)</span>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold text-amber-600">
                {product.price} DH
              </p>
              {product.originalPrice && (
                <p className="text-gray-400 line-through text-sm">
                  {product.originalPrice} DH
                </p>
              )}
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.sizes && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Tailles disponibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={openWhatsApp}
              className="w-full bg-green-500 text-white font-medium py-4 px-6 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12m.9 18.654c-1.199 0-2.374-.3-3.419-.868l-3.981 1.045 1.067-3.901a7.571 7.571 0 01-.951-3.677c0-4.185 3.399-7.583 7.584-7.583 4.184 0 7.584 3.399 7.584 7.583 0 4.185-3.4 7.583-7.584 7.583m4.5-5.683c-.229-.114-1.346-.669-1.554-.743-.209-.076-.361-.114-.514.114-.152.228-.59.744-.723.897-.132.151-.266.17-.494.057-.229-.114-.966-.357-1.838-1.135-.681-.607-1.139-1.357-1.271-1.586-.133-.228-.014-.352.099-.466.103-.1.228-.262.342-.394.115-.133.151-.229.228-.38.076-.152.038-.285-.019-.399-.057-.114-.514-1.239-.704-1.696-.184-.447-.37-.386-.514-.393-.133-.008-.286-.01-.438-.01-.151 0-.39.057-.59.285-.209.229-.799.783-.799 1.9 0 1.115.819 2.191.932 2.343.114.153 1.614 2.453 3.909 3.44.546.236.973.376 1.303.48.549.172 1.049.147 1.441.089.44-.066 1.346-.55 1.537-1.082.19-.532.19-.987.133-1.083-.057-.095-.209-.153-.437-.267z" />
              </svg>
              Contactez-nous sur WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-2 border-b border-gray-200">
            Vous pourriez aussi aimer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct, index) => {
              const actualIndex = products.findIndex(
                (p) => p.title === similarProduct.title
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/product/${actualIndex}`)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={similarProduct.image || "/api/placeholder/400/400"}
                      alt={similarProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {similarProduct.isNew && (
                      <span className="absolute top-3 right-3 bg-amber-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                        NOUVEAU
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {similarProduct.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-amber-600 font-bold">
                        {similarProduct.price} DH
                      </p>
                      {similarProduct.originalPrice && (
                        <p className="text-gray-400 line-through text-xs">
                          {similarProduct.originalPrice} DH
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
