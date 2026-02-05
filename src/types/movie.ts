export type MovieStatus = "PLANNED" | "WATCHED";

export interface Movie {
  id: string;
  title: string;
  year?: number;
  status: MovieStatus;
  rating?: number;
  watchedAt?: string;
  createdAt: string;
}

export interface CreateMovieDto {
  title: string;
  year?: number;
  status?: MovieStatus;
  rating?: number;
  watchedAt?: string;
}
