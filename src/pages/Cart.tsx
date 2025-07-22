import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 text-coffee-300 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-coffee-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-coffee-600 mb-8">
            Découvrez notre sélection de cafés d'exception et ajoutez vos favoris à votre panier.
          </p>
          <Link to="/products" className="btn-primary">
            Découvrir nos cafés
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-display font-bold text-coffee-900 mb-8">
          Votre Panier ({totalItems} article{totalItems > 1 ? 's' : ''})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-display font-semibold text-coffee-900">
                          {item.product.name}
                        </h3>
                        <p className="text-coffee-600 text-sm">
                          Origine: {item.product.origin}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-2 text-coffee-700 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-3 py-2 text-coffee-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-coffee-800">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                        <p className="text-sm text-coffee-600">
                          {item.product.price.toFixed(2)}€ / unité
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-display font-semibold text-coffee-900 mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-coffee-700">Sous-total</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-coffee-700">Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <hr className="border-coffee-200" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-coffee-900">Total</span>
                  <span className="font-bold text-coffee-800">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              {user ? (
                <button className="w-full btn-primary text-lg py-4 mb-4">
                  Procéder au paiement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-coffee-600 text-center">
                    Connectez-vous pour finaliser votre commande
                  </p>
                  <Link to="/auth" className="w-full btn-primary text-lg py-4 block text-center">
                    Se connecter
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </Link>
                </div>
              )}

              <Link
                to="/products"
                className="w-full btn-secondary text-center block py-3"
              >
                Continuer mes achats
              </Link>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-coffee-200">
                <div className="flex items-center text-sm text-coffee-600 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Paiement 100% sécurisé
                </div>
                <div className="flex items-center text-sm text-coffee-600 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Livraison gratuite dès 50€
                </div>
                <div className="flex items-center text-sm text-coffee-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Satisfaction garantie
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};