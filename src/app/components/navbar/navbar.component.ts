import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiTextfield } from '@taiga-ui/core';
import { SearchBarComponent } from '../../features/search/components/search-bar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, TuiTextfield, TuiAvatar, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  value = '';
  @ViewChild(DashboardComponent) dashboard?: DashboardComponent;

  constructor(private movieService: MovieService) {}

  onSearch(query: string) {
    if (query && query.trim() !== '') {
      this.movieService.getMoviesByQuery(query).subscribe(movies => {
        this.movieService.movies$.next(movies);
      });
    }
    if (this.dashboard) {
      this.dashboard.onSearch(query);
    }
  }
}
