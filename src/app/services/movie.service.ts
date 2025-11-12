import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../features/movies/components/movie-card.component';
import { environment } from '../../environments/environment';

export interface MovieApiResponse {
  page: number;
  totalPages: number;
  movies: Movie[];
}

export interface TmdbMovie {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}
interface TmdbRawResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/popular';
  public movies$ = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<MovieApiResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.tmdbAccessToken}`,
      accept: 'application/json',
    });
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<TmdbRawResponse>(this.apiUrl, { headers, params }).pipe(
      map((response) => ({
        page: response.page,
        totalPages: response.total_pages,
        movies: response.results.map((item) => ({
          Title: item.title,
          Year: item.release_date ? item.release_date.split('-')[0] : '',
          Runtime: '',
          Poster: item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '',
          VoteAverage: item.vote_average || 0,
        })),
      }))
    );
  }

  getMoviesByQuery(query: string): Observable<Movie[]> {
    if (!query || query.trim() === '') {
      return new Observable<Movie[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.tmdbAccessToken}`,
      accept: 'application/json',
    });
    const params = new HttpParams().set('query', query);
    return this.http.get<TmdbRawResponse>('https://api.themoviedb.org/3/search/movie', { headers, params }).pipe(
      map((response) =>
        response.results.map((item) => ({
          Title: item.title,
          Year: item.release_date ? item.release_date.split('-')[0] : '',
          Runtime: '',
          Poster: item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '',
          VoteAverage: item.vote_average || 0,
        }))
      )
    );
  }
}
