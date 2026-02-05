import { useMemo, useState } from 'react';
import type { Movie, MovieStatus, CreateMovieDto } from '../types/movie';

import { MoviesHeader } from '../components/movies/MoviesHeader';
import { MoviesFilters } from '../components/movies/MoviesFilters';
import { MoviesGrid } from '../components/movies/MoviesGrid';
import { MovieCard } from '../components/movies/MovieCard';
import { EmptyMovies } from '../components/movies/EmptyMovie';
import { AddMovieModal } from '../components/movies/AddMovieModal';

import { createMovie } from '../services/movies.service';

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<MovieStatus | 'all'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === 'all' || movie.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [movies, search, status]);

  // ✅ ЄДИНИЙ правильний handleAddMovie
  const handleAddMovie = async (data: CreateMovieDto) => {
    const movie = await createMovie(data);
    setMovies(prev => [movie, ...prev]);
    setIsAddOpen(false);
  };

  const handleDeleteMovie = (id: string) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <MoviesHeader
        total={movies.length}
        watched={movies.filter(m => m.status === 'WATCHED').length}
        onAdd={() => setIsAddOpen(true)}
      />

      <MoviesFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {filteredMovies.length === 0 ? (
        <EmptyMovies onAdd={() => setIsAddOpen(true)} />
      ) : (
        <MoviesGrid>
          {filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={() => handleDeleteMovie(movie.id)}
            />
          ))}
        </MoviesGrid>
      )}

      <AddMovieModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddMovie}
      />
    </div>
  );
}
