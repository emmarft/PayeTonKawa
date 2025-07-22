import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Award } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';

// Mock data - in real app, this would come from API
const products: Product[] = [
  {
    id: '1',
    name: 'Éthiopie Sidamo',
    description: 'Un café aux arômes floraux et fruités, avec des notes de bergamote et de jasmin. Ce café d\'exception provient des hauts plateaux éthiopiens, berceau du café. Cultivé à plus de 1800 mètres d\'altitude, il développe une complexité aromatique unique. La variété Heirloom, cultivée selon des méthodes traditionnelles, offre une tasse d\'une finesse remarquable.',
    price: 24.90,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800',
    origin: 'Éthiopie',
    roast_level: 'light',
    tasting_notes: ['Floral', 'Bergamote', 'Jasmin', 'Fruité', 'Acidité vive', 'Corps léger'],
    stock: 15,
    featured: true,
  },
  // Add other products here...
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-coffee-900 mb-4">
            Produit non trouvé
          </h1>
          <Link to="/products" className="btn-primary">
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const getRoastColor = (level: string) => {
    switch (level) {
      case 'light': return 'bg-amber-200 text-amber-800';
      case 'medium': return 'bg-orange-200 text-orange-800';
      case 'dark': return 'bg-coffee-200 text-coffee-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getRoastLabel = (level: string) => {
    switch (level) {
      case 'light': return 'Torréfaction claire';
      case 'medium': return 'Torréfaction moyenne';
      case 'dark': return 'Torréfaction foncée';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link
            to="/products"
            className="flex items-center text-coffee-600 hover:text-coffee-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux produits
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-coffee-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Coup de cœur
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-coffee-900 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-coffee-600 mb-4">
                Origine: {product.origin}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-coffee-800">
                  {product.price.toFixed(2)}€
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoastColor(product.roast_level)}`}>
                  {getRoastLabel(product.roast_level)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-display font-semibold text-coffee-900 mb-3">
                Description
              </h2>
              <p className="text-coffee-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tasting Notes */}
            <div>
              <h2 className="text-xl font-display font-semibold text-coffee-900 mb-3">
                Notes de dégustation
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.tasting_notes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-cream-100 text-coffee-700 px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-coffee-700 font-medium">
                  Disponibilité:
                </span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-coffee-700 font-medium">
                  Quantité:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-coffee-700 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-coffee-700 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg py-4"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  Ajouter au panier - {(product.price * quantity).toFixed(2)}€
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <Truck className="h-8 w-8 text-coffee-600 mx-auto mb-2" />
                <p className="text-sm text-coffee-700 font-medium">
                  Livraison 24-48h
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Shield className="h-8 w-8 text-coffee-600 mx-auto mb-2" />
                <p className="text-sm text-coffee-700 font-medium">
                  Paiement sécurisé
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Award className="h-8 w-8 text-coffee-600 mx-auto mb-2" />
                <p className="text-sm text-coffee-700 font-medium">
                  Qualité garantie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};