import { Routes } from '@angular/router';
import { MovieSearchPageComponent } from './features/search/pages/movie-search-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MovieSearchPageComponent,
    pathMatch: 'full',
  },
  // Можно добавить другие маршруты для dashboard, favorites и т.д.
];
