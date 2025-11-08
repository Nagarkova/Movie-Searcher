import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../components/movie-card.component';
import { environment } from '../../../core/environment';

export const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/popular';
export const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
export const TMDB_DETAILS_URL = 'https://api.themoviedb.org/3/movie';

interface TmdbMovie {
  title: string;
  release_date: string;
  poster_path: string;
  runtime?: number;
}
interface TmdbResponse {
  results: TmdbMovie[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = TMDB_API_URL;
  private searchUrl = TMDB_SEARCH_URL;
  private detailsUrl = TMDB_DETAILS_URL;

  movies$ = new BehaviorSubject<Movie[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  getMovies(): void {
    this.isLoading$.next(true);
    const headers = this.getHeaders();
    this.http.get<TmdbResponse>(this.apiUrl, { headers }).pipe(
      map(response => response.results.map(this.mapMovie)),
    ).subscribe({
      next: movies => {
        this.movies$.next(movies);
        this.isLoading$.next(false);
        this.error$.next(null);
      },
      error: () => {
        this.error$.next('Ошибка загрузки фильмов');
        this.isLoading$.next(false);
      }
    });
  }

  searchMovies(query: string): void {
    this.isLoading$.next(true);
    const headers = this.getHeaders();
    this.http.get<TmdbResponse>(`${this.searchUrl}?query=${encodeURIComponent(query)}`, { headers }).pipe(
      map(response => response.results.map(this.mapMovie)),
    ).subscribe({
      next: movies => {
        this.movies$.next(movies);
        this.isLoading$.next(false);
        this.error$.next(null);
      },
      error: () => {
        this.error$.next('Ошибка поиска фильмов');
        this.isLoading$.next(false);
      }
    });
  }

  getMovieDetails(id: string): Observable<Movie> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.detailsUrl}/${id}`, { headers }).pipe(
      map(item => this.mapMovie(item))
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.tmdbAccessToken}`,
      accept: 'application/json',
    });
  }

  private mapMovie(item: any): Movie {
    return {
      Title: item.title,
      Year: item.release_date ? item.release_date.split('-')[0] : '',
      Runtime: item.runtime ? `${item.runtime} min` : '',
      Poster: item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '',
      // ...другие поля...
    };
  }
}
