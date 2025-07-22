import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

// Mock data for all products
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Éthiopie Sidamo',
    description: 'Un café aux arômes floraux et fruités, avec des notes de bergamote et de jasmin.',
    price: 24.90,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
    origin: 'Éthiopie',
    roast_level: 'light',
    tasting_notes: ['Floral', 'Bergamote', 'Jasmin', 'Fruité'],
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Guatemala Antigua',
    description: 'Café corsé aux notes chocolatées et épicées, cultivé sur les pentes volcaniques.',
    price: 26.50,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=500',
    origin: 'Guatemala',
    roast_level: 'medium',
    tasting_notes: ['Chocolat', 'Épices', 'Noisette', 'Caramel'],
    stock: 12,
    featured: true,
  },
  {
    id: '3',
    name: 'Colombie Huila',
    description: 'Café équilibré aux notes de fruits rouges et de caramel, récolté à haute altitude.',
    price: 23.80,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=500',
    origin: 'Colombie',
    roast_level: 'medium',
    tasting_notes: ['Fruits rouges', 'Caramel', 'Vanille', 'Équilibré'],
    stock: 18,
    featured: true,
  },
  {
    id: '4',
    name: 'Brésil Santos',
    description: 'Café doux et rond aux notes de noisette et de chocolat au lait.',
    price: 21.90,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=500',
    origin: 'Brésil',
    roast_level: 'medium',
    tasting_notes: ['Noisette', 'Chocolat au lait', 'Doux', 'Rond'],
    stock: 25,
    featured: false,
  },
  {
    id: '5',
    name: 'Kenya AA',
    description: 'Café intense aux notes de cassis et d\'agrumes, avec une acidité vive.',
    price: 28.90,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
    origin: 'Kenya',
    roast_level: 'light',
    tasting_notes: ['Cassis', 'Agrumes', 'Intense', 'Acidité vive'],
    stock: 8,
    featured: false,
  },
  {
    id: '6',
    name: 'Costa Rica Tarrazú',
    description: 'Café équilibré aux notes de miel et de fruits tropicaux.',
    price: 25.50,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=500',
    origin: 'Costa Rica',
    roast_level: 'medium',
    tasting_notes: ['Miel', 'Fruits tropicaux', 'Équilibré', 'Sucré'],
    stock: 14,
    featured: false,
  },
];

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedRoast, setSelectedRoast] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // Get unique origins for filter
  const origins = Array.from(new Set(allProducts.map(p => p.origin))).sort();

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tasting_notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesOrigin = !selectedOrigin || product.origin === selectedOrigin;
    const matchesRoast = !selectedRoast || product.roast_level === selectedRoast;
    
    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      matchesPrice = product.price >= min && (max ? product.price <= max : true);
    }

    return matchesSearch && matchesOrigin && matchesRoast && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-display font-bold text-coffee-900 mb-4">
            Nos Cafés d'Exception
          </h1>
          <p className="text-xl text-coffee-600">
            Découvrez notre collection complète de cafés premium du monde entier
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-coffee-800 mr-2" />
                <h2 className="text-lg font-display font-semibold text-coffee-900">
                  Filtres
                </h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Recherche
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Origin Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Origine
                </label>
                <select
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="">Toutes les origines</option>
                  {origins.map(origin => (
                    <option key={origin} value={origin}>{origin}</option>
                  ))}
                </select>
              </div>

              {/* Roast Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Torréfaction
                </label>
                <select
                  value={selectedRoast}
                  onChange={(e) => setSelectedRoast(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="">Tous les niveaux</option>
                  <option value="light">Torréfaction claire</option>
                  <option value="medium">Torréfaction moyenne</option>
                  <option value="dark">Torréfaction foncée</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Prix
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  <option value="">Tous les prix</option>
                  <option value="0-25">Moins de 25€</option>
                  <option value="25-30">25€ - 30€</option>
                  <option value="30-">Plus de 30€</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedOrigin('');
                  setSelectedRoast('');
                  setPriceRange('');
                }}
                className="w-full btn-secondary text-sm"
              >
                Effacer les filtres
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-coffee-600">
                {filteredProducts.length} café{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-coffee-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-display font-semibold text-coffee-900 mb-2">
                  Aucun café trouvé
                </h3>
                <p className="text-coffee-600">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};