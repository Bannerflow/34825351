import { Routes } from '@angular/router';
import { RoutePaths } from '../models/routes.model';

// paths to be used in the application navigation directly
export const mainPaths = {
  pokemons: '/pokemons',
} as const satisfies RoutePaths;

// angular routing for the paths
export const mainRoutes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () =>
      import(
        '../../layouts/pokemon-app-layout/pokemon-app-layout.component'
      ).then((m) => m.PokemonAppLayoutComponent),
  },
  { path: '**', redirectTo: 'pokemons' },
];
