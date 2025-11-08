import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../components/search-bar.component';
import { MovieListComponent } from '../components/movie-list.component';
import { PaginationComponent } from '../components/pagination.component';
import { MovieService } from '../../movies/services/movie.service';
import { Movie } from '../../movies/components/movie-card.component';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-movie-search-page',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, MovieListComponent, PaginationComponent],
  template: `
    <app-search-bar (search)="onSearch($event)"></app-search-bar>
    <app-movie-list [movies]="movies"></app-movie-list>
    <app-pagination
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      (pageChange)="onPageChange($event)"
    ></app-pagination>
    <div *ngIf="isLoading" class="spinner">Loading...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    <div *ngIf="globalError" class="error">{{ globalError }}</div>
  `,
})
export class MovieSearchPageComponent implements OnInit {
  movies: Movie[] = [];
  isLoading = false;
  error: string | null = null;
  globalError: string | null = null;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private movieService: MovieService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.movieService.movies$.subscribe(movies => this.movies = movies);
    this.movieService.isLoading$.subscribe(loading => this.isLoading = loading);
    this.movieService.error$.subscribe(error => this.error = error);
    this.errorService.error$.subscribe(err => this.globalError = err);
    this.movieService.getMovies();
  }

  onSearch(query: string) {
    this.currentPage = 1;
    this.movieService.searchMovies(query);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    // Для реального API нужно добавить логику пагинации
    // this.movieService.getMovies(page);
  }
}
