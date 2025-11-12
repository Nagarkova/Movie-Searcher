import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="search-bar-form" (submit)="onSubmit($event)">
      <input type="text" [(ngModel)]="searchValue" name="search" placeholder="Search movies..." />
      <button type="submit">Search</button>
    </form>
  `,
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchValue = '';
  @Output() search = new EventEmitter<string>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.search.emit(this.searchValue.trim());
  }
}
