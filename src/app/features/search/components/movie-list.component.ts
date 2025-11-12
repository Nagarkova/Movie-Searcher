import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../movies/components/movie-card.component';
import { Movie } from '../../movies/components/movie-card.component';
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, PaginationComponent],
  template: `
    <app-pagination
      [currentPage]="1"
      [totalPages]="5"
      (pageChange)="onPageChange($event)"
    ></app-pagination>
    <div class="movies-grid">
      <app-movie-card *ngFor="let movie of movies" [movie]="movie"></app-movie-card>
    </div>

  `,
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];

  onPageChange(page: number) {
    console.log('Page changed:', page);
  }
}
