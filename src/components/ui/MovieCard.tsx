import React from 'react';
import { Movie } from '../../types';
import Button from './Button';

interface MovieCardProps {
  movie: Movie;
  onViewDetails?: () => void;
  onBookTicket?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewMode?: 'customer' | 'admin';
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onViewDetails,
  onBookTicket,
  onEdit,
  onDelete,
  viewMode = 'customer',
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
          {movie.duration} min
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {movie.title}
          </h3>
          <span className="text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-0.5 rounded">
            {movie.genre}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {movie.releaseYear}
        </p>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {movie.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {viewMode === 'customer' && (
            <>
              {onViewDetails && (
                <Button variant="outline" size="sm" onClick={onViewDetails}>
                  Details
                </Button>
              )}
              {onBookTicket && (
                <Button size="sm" onClick={onBookTicket}>
                  Book Ticket
                </Button>
              )}
            </>
          )}
          
          {viewMode === 'admin' && (
            <>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="danger" size="sm" onClick={onDelete}>
                  Delete
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;