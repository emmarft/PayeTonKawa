import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Coffee, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-800" />
            <span className="text-2xl font-display font-bold text-coffee-900">
              PayeTonKawa
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-coffee-700 hover:text-coffee-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="text-coffee-700 hover:text-coffee-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Nos Cafés
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher un café..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-coffee-700 hover:text-coffee-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-coffee-700 hover:text-coffee-900 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block text-sm">
                    {user.user_metadata?.name || user.email}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mes commandes
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 text-coffee-700 hover:text-coffee-900 transition-colors"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:block text-sm">Se connecter</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};