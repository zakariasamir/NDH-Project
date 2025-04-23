import { useState, useEffect } from "react";
import useSWR from "swr";
import ProductCard from "../Components/ProductCard";
import heroImg from "../assets/hero-img.png";
// import heroImg2 from "../assets/hero-img2.png";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: products,
    error,
    isLoading,
  } = useSWR(
    "https://script.google.com/macros/s/AKfycbwlpSyRsHsPRSuHBY5s8rM_fe_odp8_haIKaEDqtlVLnKJz_86XJBGK5zJ6oPbahg_HDw/exec",
    fetcher
  );

  const filteredProducts = products
    ? products.filter((product) => {
        const matchesSearch =
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
    : [];

  return (
    <div className="mb-12">
      {/* Hero Section Moderne */}
      <div className="relative bg-gradient-to-br from-amber-800 to-amber-600 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="container mx-auto">
          <div className="relative z-10 text-white p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Artisanat Marocain d'Exception
              </h1>
              <p className="text-lg md:text-xl mb-6 max-w-lg">
                Découvrez notre collection exclusive de vêtements traditionnels
                marocains - Djellabas, Kaftans, et plus encore. Créations sur
                mesure pour honorer votre élégance.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-amber-800 font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:scale-105">
                  Explorer la Collection
                </button>
                <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
                  Sur Mesure
                </button>
              </div>
            </div>
            <div className="lg:w-3/4 flex justify-center">
              <div className="relative w-full max-w-xl">
                <img
                  src={heroImg}
                  className="w-full h-auto object-contain drop-shadow-2xl transform scale-110"
                  alt="Kaftan marocain traditionnel"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-amber-900"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-amber-900"></div>
        </div>

        {/* Motifs traditionnels */}
        <div className="absolute bottom-0 left-0 w-full opacity-5">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      {/* Valeurs */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Livraison Rapide</h3>
            <p className="text-gray-600">
              Expédition sous 48h au Maroc et à l'international
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Qualité Premium</h3>
            <p className="text-gray-600">
              Tissus nobles et broderies artisanales de qualité supérieure
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Sur Mesure</h3>
            <p className="text-gray-600">
              Personnalisation selon vos mesures et préférences
            </p>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-6 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700"
          />
          <svg
            className="w-6 h-6 text-gray-400 absolute left-4 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grille de produits */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Échec du chargement des produits. Veuillez réessayer plus tard.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Aucun produit ne correspond à votre recherche.
              </p>
            </div>
          )}
        </>
      )}

      {/* CTA Final */}
      <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4">
          Une création unique pour chaque occasion
        </h2>
        <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
          Que ce soit pour un mariage, une fête ou un événement spécial, nos
          artisans créent des pièces qui vous ressemblent.
        </p>
        <button className="bg-amber-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-amber-800 transition-colors shadow-lg inline-flex items-center">
          Contactez-nous pour une création sur mesure
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
