import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Truck, Award, Heart } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

// Mock data for featured products
const featuredProducts: Product[] = [
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
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-coffee-900 to-coffee-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              L'Art du Café
              <span className="block text-cream-200">d'Exception</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection de cafés d'exception, importés directement des meilleures plantations du monde entier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary text-lg px-8 py-4">
                Découvrir nos cafés
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                Notre histoire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-coffee-900 mb-4">
              Nos Coups de Cœur
            </h2>
            <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
              Une sélection de nos cafés les plus appréciés, choisis pour leur qualité exceptionnelle et leurs arômes uniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products" className="btn-primary text-lg px-8 py-4">
              Voir tous nos cafés
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-coffee-900 mb-4">
              Pourquoi Choisir PayeTonKawa ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-coffee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-coffee-800" />
              </div>
              <h3 className="text-xl font-display font-semibold text-coffee-900 mb-2">
                Qualité Premium
              </h3>
              <p className="text-coffee-600">
                Cafés sélectionnés avec soin auprès des meilleures plantations mondiales.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-coffee-800" />
              </div>
              <h3 className="text-xl font-display font-semibold text-coffee-900 mb-2">
                Livraison Rapide
              </h3>
              <p className="text-coffee-600">
                Expédition sous 24h pour une fraîcheur optimale de vos cafés.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-coffee-800" />
              </div>
              <h3 className="text-xl font-display font-semibold text-coffee-900 mb-2">
                Expertise
              </h3>
              <p className="text-coffee-600">
                Plus de 6 ans d'expérience dans l'import de cafés d'exception.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-coffee-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-coffee-800" />
              </div>
              <h3 className="text-xl font-display font-semibold text-coffee-900 mb-2">
                Commerce Équitable
              </h3>
              <p className="text-coffee-600">
                Partenariats directs avec les producteurs pour un commerce éthique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-coffee-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Prêt à Découvrir Votre Café Parfait ?
          </h2>
          <p className="text-xl mb-8 text-cream-200">
            Rejoignez des milliers d'amateurs de café qui nous font confiance depuis 2018.
          </p>
          <Link to="/products" className="btn-primary text-lg px-8 py-4">
            Commencer ma dégustation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};