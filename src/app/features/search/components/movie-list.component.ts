import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../movies/components/movie-card.component';
import { Movie } from '../../movies/components/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="movies-grid">
      <app-movie-card *ngFor="let movie of movies" [movie]="movie"></app-movie-card>
    </div>
  `,
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
}
