import { Routes } from '@angular/router';
import { RoutePaths } from '../../shared/models/routes.model';
import { PokemonAppLayoutComponent } from './pokemon-app-layout.component';
import { pokemonListRoute } from '../../pages/pokemon-list/pokemon-list.route';
import { pokemonDetailRoute } from '../../pages/pokemon-detail/pokemon-detail.route';

// paths to be used in the application navigation directly
export const pokemonPaths = {
  list: '/pokemon/list',
  showOne: (pokemonId: string) => `/pokemon/show/${pokemonId}`,
} as const satisfies RoutePaths;

// angular routing for the paths
export const pokemonRoutes: Routes = [
  {
    path: '',
    component: PokemonAppLayoutComponent,
    children: [
      pokemonListRoute,
      pokemonDetailRoute,
      { path: '**', redirectTo: 'list' },
    ],
  },
];
