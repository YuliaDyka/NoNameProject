export function EmptyMovies({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="text-4xl">🎬</div>
      <p>У вас ще немає фільмів</p>
      <button onClick={onAdd} className="btn-primary">
        + Додати перший фільм
      </button>
    </div>
  );
}
