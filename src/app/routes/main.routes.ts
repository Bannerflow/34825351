import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: 'app',
    loadComponent: () =>
      import('../layouts/pokemon-app-layout/pokemon-app-layout.component').then(
        (m) => m.PokemonAppLayoutComponent
      ),
  },
  { path: '**', redirectTo: 'app' },
];
