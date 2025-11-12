import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="pagination"
      style="display: flex; justify-content: flex-end; align-items: center; gap: 16px; margin-top: 24px;"
    >
      <button
        [disabled]="currentPage === 1"
        (click)="changePage(1)"
        style="padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: pointer;"
      >
        « First
      </button>
      <button
        [disabled]="currentPage === 1"
        (click)="changePage(currentPage - 1)"
        style="padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: pointer;"
      >
        ‹ Prev
      </button>
      <ng-container *ngFor="let page of getPages()">
        <button
          [disabled]="page === currentPage"
          (click)="changePage(page)"
          style="padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: pointer; font-weight: {{page === currentPage ? 'bold' : 'normal'}};"
        >
          {{ page }}
        </button>
      </ng-container>
      <button
        [disabled]="currentPage === totalPages"
        (click)="changePage(currentPage + 1)"
        style="padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: pointer;"
      >
        Next ›
      </button>
      <button
        [disabled]="currentPage === totalPages"
        (click)="changePage(totalPages)"
        style="padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc; background: #fff; cursor: pointer;"
      >
        Last »
      </button>
      <span style="font-weight: 500; margin-left: 16px;">
        Page {{ currentPage }} / {{ totalPages }}
      </span>
    </div>
  `,
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, this.currentPage + 2);
    if (this.currentPage <= 3) {
      end = Math.min(this.totalPages, maxPagesToShow);
    }
    if (this.currentPage >= this.totalPages - 2) {
      start = Math.max(1, this.totalPages - maxPagesToShow + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
