import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../components/movie-card/movie-card.component';
import { environment } from '../../environments/environment';

interface TmdbMovie {
  title: string;
  release_date: string;
  poster_path: string;
}
interface TmdbResponse {
  results: TmdbMovie[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.tmdbAccessToken}`,
      accept: 'application/json',
    });
    return this.http.get<TmdbResponse>(this.apiUrl, { headers }).pipe(
      map((response) =>
        response.results.map((item: TmdbMovie) => ({
          Title: item.title,
          Year: item.release_date ? item.release_date.split('-')[0] : '',
          Runtime: '', // TMDB popular endpoint не возвращает runtime
          Poster: item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '',
        })),
      ),
    );
  }
}
