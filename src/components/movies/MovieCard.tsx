import type { Movie } from '../../types/movie';

interface Props {
  movie: Movie;
  onDelete: () => void;
}

export function MovieCard({ movie, onDelete }: Props) {
  return (
    <div
      className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition p-5 flex flex-col min-h-55"
    >
      {/* Заголовок */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold leading-tight">
          {movie.title}
        </h3>

        <span
          className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${movie.status === 'watched' && 'bg-green-100 text-green-700'}
            ${movie.status === 'planned' && 'bg-gray-100 text-gray-600'}
            ${movie.status === 'watching' && 'bg-blue-100 text-blue-700'}
          `}
        >
          {movie.status}
        </span>
      </div>

      {/* Рік */}
      <p className="text-sm text-gray-500 mt-1">
        {movie.year}
      </p>

      {/* Рейтинг */}
      {movie.rating && (
        <div className="mt-3 flex items-center gap-1 text-yellow-500">
          ⭐ <span className="text-sm text-gray-700">{movie.rating}/10</span>
        </div>
      )}

      {/* Кнопки */}
      <div className="mt-auto pt-4 flex justify-end gap-2">
        <button
          className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
          title="Редагувати"
        >
          ✏
        </button>
        <button
          onClick={onDelete}
          className="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          title="Видалити"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
