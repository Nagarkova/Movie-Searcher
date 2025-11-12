import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-pie',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pie-rating-container">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          stroke="#eee"
          stroke-width="6"
        />
        <circle
          cx="20" cy="20" r="16"
          fill="none"
          [attr.stroke]="getColor()"
          stroke-width="6"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="circumference - (value / 10) * circumference"
          stroke-linecap="round"
          style="transition: stroke-dashoffset 0.3s;"
          transform="rotate(-90 20 20)"
        />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="#333">
          {{ value | number: '1.1-1' }}
        </text>
      </svg>
    </div>
  `,
  styles: [`
    .pie-rating-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
    }
  `]
})
export class RatingPieComponent {
  @Input() value: number = 0;
  readonly circumference = 2 * Math.PI * 16;

  getColor(): string {
    if (this.value >= 7) return '#4caf50'; // green
    if (this.value >= 5) return '#ffc107'; // yellow
    return '#f44336'; // red
  }
}
