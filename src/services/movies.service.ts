import { apiFetch } from "./api";
import type { CreateMovieDto, Movie } from "../types/movie";

export function createMovie(data: CreateMovieDto) {
  return apiFetch<Movie>("/movies", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getMovies() {
  return apiFetch<Movie[]>("/movies");
}

export function deleteMovie(id: string) {
  return apiFetch<void>(`/movies/${id}`, {
    method: "DELETE",
  });
}
