import { Routes } from '@angular/router';
import { RoutePaths } from '../models/routes.model';

// paths to be used in the application navigation directly
export const pokemonPaths = {
  list: '/pokemons/list',
  showOne: (pokemonId: string) => `/pokemons/show/${pokemonId}`,
} as const satisfies RoutePaths;

// angular routing for the paths
export const pokemonRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import(
        '../../layouts/pokemon-app-layout/pokemon-app-layout.component'
      ).then((m) => m.PokemonAppLayoutComponent),
  },
  {
    path: 'show/:pokemonId',
    loadComponent: () =>
      import(
        '../../layouts/pokemon-app-layout/pokemon-app-layout.component'
      ).then((m) => m.PokemonAppLayoutComponent),
  },
  { path: '**', redirectTo: 'list' },
];
