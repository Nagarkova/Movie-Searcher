import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent, Movie } from '../../features/movies/components/movie-card.component';
import { MovieService, TmdbMovie } from '../../services/movie.service';
import { PaginationComponent } from '../../features/search/components/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, PaginationComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  totalPages: number = 5;
  searchQuery: string = '';
  private moviesSub?: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.moviesSub = this.movieService.movies$.subscribe(movies => {
      if (movies.length) {
        this.movies = movies;
        this.isLoading = false;
        this.error = null;
      }
    });
    this.loadMovies(this.currentPage);
  }

  ngOnDestroy(): void {
    this.moviesSub?.unsubscribe();
  }

  loadMovies(page: number) {
    // TMDB API: max page is 500, min is 1
    const safePage = Math.max(1, Math.min(page, 500));
    this.isLoading = true;
    this.movieService.getMovies(safePage).subscribe({
      next: (response) => {
        this.movies = response.movies;
        this.currentPage = response.page;
        this.totalPages = Math.min(response.totalPages, 500);
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Ошибка загрузки фильмов';
        this.isLoading = false;
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMovies(page);
  }

  onSearch(query: string) {
    this.searchQuery = query;
    if (!query) {
      this.loadMovies(1);
      return;
    }
    this.isLoading = true;
    this.movieService.getMoviesByQuery(query).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.currentPage = 1;
        this.totalPages = 1;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Ошибка поиска фильмов';
        this.isLoading = false;
      },
    });
  }
}
