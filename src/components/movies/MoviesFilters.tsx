import type { MovieStatus } from '../../types/movie';

interface Props {
  search: string;
  status: MovieStatus | 'all';
  onSearchChange: (v: string) => void;
  onStatusChange: (v: MovieStatus | 'all') => void;
}

export function MoviesFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <input 
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Пошук за назвою"
        className="
      w-full sm:max-w-sm
      rounded-lg border border-gray-300
      px-4 py-2
      focus:outline-none focus:ring-2 focus:ring-black
    "
      />

      <select
        value={status}
        onChange={e => onStatusChange(e.target.value as any)}
        className="
      rounded-lg border border-gray-300
      px-4 py-2
      bg-white
      focus:outline-none focus:ring-2 focus:ring-black
    "
      >
        <option value="all">Усі</option>
        <option value="planned">Заплановані</option>
        <option value="watching">В процесі</option>
        <option value="watched">Переглянуті</option>
      </select>
    </div>
  );
}
