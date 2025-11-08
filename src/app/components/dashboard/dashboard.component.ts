import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent, Movie } from '../movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Ошибка загрузки фильмов';
        this.isLoading = false;
      },
    });
  }
}
