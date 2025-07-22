import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
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
    <Link to={`/product/${product.id}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-coffee-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Coup de cœur
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoastColor(product.roast_level)}`}>
              {getRoastLabel(product.roast_level)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-semibold text-coffee-900 group-hover:text-coffee-700 transition-colors">
              {product.name}
            </h3>
            <span className="text-2xl font-bold text-coffee-800">
              {product.price.toFixed(2)}€
            </span>
          </div>

          <p className="text-coffee-600 text-sm mb-2">
            Origine: {product.origin}
          </p>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Tasting Notes */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.tasting_notes.slice(0, 3).map((note, index) => (
                <span
                  key={index}
                  className="bg-cream-100 text-coffee-700 px-2 py-1 rounded text-xs"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm px-4 py-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Ajouter</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};