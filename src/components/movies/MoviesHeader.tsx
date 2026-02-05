interface Props {
  total: number;
  watched: number;
  onAdd: () => void;
}

export function MoviesHeader({ total, watched, onAdd }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          🎬 Фільми
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Усього: {total} · Переглянуто: {watched}
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
          inline-flex items-center gap-2
          rounded-xl bg-black px-5 py-3
          text-white font-medium
          hover:bg-gray-800 transition
        "
      >
        + Додати фільм
      </button>
    </div>
  );
}
