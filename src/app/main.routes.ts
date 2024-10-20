import { Routes } from '@angular/router';
import { RoutePaths } from './shared/models/routes.model';

// paths to be used in the application navigation directly
export const mainPaths = {
  pokemon: '/pokemon',
} as const satisfies RoutePaths;

// angular routing for the paths
export const mainRoutes: Routes = [
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./layouts/pokemon-app-layout/pokemon-app-layout.module').then(
        (m) => m.PokemonAppLayoutModule
      ),
  },
  { path: '**', redirectTo: 'pokemon' },
];
