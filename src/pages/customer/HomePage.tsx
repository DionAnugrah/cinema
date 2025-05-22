import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../../components/layouts/CustomerLayout';
import MovieCard from '../../components/ui/MovieCard';
import { mockMovies } from '../../data/mockData';
import { Film } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // Get unique genres from movies
  const genres = ['All', ...Array.from(new Set(mockMovies.map(movie => movie.genre)))];
  
  // Filter movies by genre
  const filteredMovies = selectedGenre === 'All' 
    ? mockMovies 
    : mockMovies.filter(movie => movie.genre === selectedGenre);

  const handleViewDetails = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };
  
  const handleBookTicket = (movieId: string) => {
    navigate(`/booking/${movieId}`);
  };

  return (
    <CustomerLayout>
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="h-64 md:h-96 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl overflow-hidden flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Film className="mx-auto mb-4 text-red-500" size={48} />
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              Welcome to MetaCine
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              Experience movies like never before
            </p>
            <button 
              onClick={() => document.getElementById('movie-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Explore Movies
            </button>
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Now Showing
        </h2>
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      <div id="movie-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onViewDetails={() => handleViewDetails(movie.id)}
            onBookTicket={() => handleBookTicket(movie.id)}
            viewMode="customer"
          />
        ))}
      </div>
    </CustomerLayout>
  );
};

export default HomePage;