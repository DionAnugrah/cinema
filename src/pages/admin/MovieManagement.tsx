import React, { useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import MovieCard from '../../components/ui/MovieCard';
import { Movie } from '../../types';
import { mockMovies } from '../../data/mockData';
import { Plus, Search } from 'lucide-react';

const MovieManagement: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Partial<Movie>>({
    id: '',
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    duration: 120,
    description: '',
    posterUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Filter movies based on search term
  const filteredMovies = movies.filter(
    movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddMovie = () => {
    setIsEditing(false);
    setCurrentMovie({
      id: '',
      title: '',
      genre: '',
      releaseYear: new Date().getFullYear(),
      duration: 120,
      description: '',
      posterUrl: '',
    });
    setIsModalOpen(true);
  };
  
  const handleEditMovie = (movie: Movie) => {
    setIsEditing(true);
    setCurrentMovie(movie);
    setIsModalOpen(true);
  };
  
  const handleDeleteMovie = (movieId: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(movie => movie.id !== movieId));
    }
  };
  
  const handleSaveMovie = () => {
    if (!currentMovie.title || !currentMovie.genre) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isEditing) {
      // Update existing movie
      setMovies(
        movies.map(movie => 
          movie.id === currentMovie.id ? { ...movie, ...currentMovie } as Movie : movie
        )
      );
    } else {
      // Add new movie
      const newMovie = {
        ...currentMovie,
        id: Date.now().toString(), // Generate a unique ID
      } as Movie;
      
      setMovies([...movies, newMovie]);
    }
    
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setCurrentMovie({
      ...currentMovie,
      [id]: id === 'releaseYear' || id === 'duration' ? parseInt(value, 10) : value,
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Movie Management</h2>
        <Button onClick={handleAddMovie}>
          <Plus size={16} className="mr-2" />
          Add Movie
        </Button>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search movies by title or genre..."
            className="pl-10 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>
      
      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              viewMode="admin"
              onEdit={() => handleEditMovie(movie)}
              onDelete={() => handleDeleteMovie(movie.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No movies found</p>
          </div>
        )}
      </div>
      
      {/* Add/Edit Movie Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Movie' : 'Add New Movie'}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              id="title"
              label="Title"
              value={currentMovie.title || ''}
              onChange={handleInputChange}
              required
            />
            <Input
              id="genre"
              label="Genre"
              value={currentMovie.genre || ''}
              onChange={handleInputChange}
              required
            />
            <Input
              id="releaseYear"
              label="Release Year"
              type="number"
              value={currentMovie.releaseYear || ''}
              onChange={handleInputChange}
              required
            />
            <Input
              id="duration"
              label="Duration (minutes)"
              type="number"
              value={currentMovie.duration || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Input
              id="posterUrl"
              label="Poster URL"
              value={currentMovie.posterUrl || ''}
              onChange={handleInputChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                value={currentMovie.description || ''}
                onChange={(e) => setCurrentMovie({
                  ...currentMovie,
                  description: e.target.value,
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                rows={5}
                required
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveMovie}>
            {isEditing ? 'Update Movie' : 'Add Movie'}
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default MovieManagement;