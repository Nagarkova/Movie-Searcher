import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent, Movie } from '../movie-card/movie-card.component';
import { MovieService, TmdbMovie } from '../../services/movie.service';
import { PaginationComponent } from '../../features/search/components/pagination.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, PaginationComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  currentPage: number = 1;
  totalPages: number = 5;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
  }

  loadMovies(page: number) {
    this.isLoading = true;
    this.movieService.getMovies(page).subscribe({
      next: (response) => {
        this.movies = response.movies;
        this.currentPage = response.page;
        this.totalPages = response.totalPages;
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
}
