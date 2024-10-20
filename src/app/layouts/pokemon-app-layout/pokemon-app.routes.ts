import { Routes } from '@angular/router';
import { RoutePaths } from '../../shared/models/routes.model';
import { PokemonAppLayoutComponent } from './pokemon-app-layout.component';

// paths to be used in the application navigation directly
export const pokemonPaths = {
  list: '/pokemons/list',
  showOne: (pokemonId: string) => `/pokemons/show/${pokemonId}`,
} as const satisfies RoutePaths;

// angular routing for the paths
export const pokemonRoutes: Routes = [
  {
    path: '',
    component: PokemonAppLayoutComponent,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../../pages/pokemon-list/pokemon-list.component').then(
            (m) => m.PokemonListComponent
          ),
        title: 'Pokemon list',
      },
      {
        path: 'show/:pokemonId',
        loadComponent: () =>
          import('./pokemon-app-layout.component').then(
            (m) => m.PokemonAppLayoutComponent
          ),
      },
      { path: '**', redirectTo: 'list' },
    ],
  },
];
