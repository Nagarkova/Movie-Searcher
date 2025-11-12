import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingPieComponent } from '../../../shared/components/rating-pie.component';

export interface Movie {
  Title: string;
  Year: string;
  Runtime: string;
  Poster?: string;
  VoteAverage?: number;
}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RatingPieComponent],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}
