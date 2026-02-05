import { useState } from 'react';
import type { CreateMovieDto, MovieStatus } from '../../types/movie';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMovieDto) => void;
}

export function AddMovieModal({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<CreateMovieDto>({
    title: '',
    status: 'PLANNED',
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">Додати фільм</h2>

        <input
          className="input"
          placeholder="Назва"
          value={form.title}
          onChange={e =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="input"
          type="number"
          placeholder="Рік"
          value={form.year ?? ''}
          onChange={e =>
            setForm({
              ...form,
              year: Number(e.target.value) || undefined,
            })
          }
        />

        <select
          className="input"
          value={form.status}
          onChange={e =>
            setForm({
              ...form,
              status: e.target.value as MovieStatus,
            })
          }
        >
          <option value="PLANNED">Заплановано</option>
          <option value="WATCHED">Переглянуто</option>
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose}>Скасувати</button>
          <button
            className="btn-primary"
            disabled={!form.title.trim()}
            onClick={() => onSubmit(form)}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
