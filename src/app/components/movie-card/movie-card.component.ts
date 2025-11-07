import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Movie {
  Title: string;
  Year: string;
  Runtime: string;
  Poster?: string;
}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}
