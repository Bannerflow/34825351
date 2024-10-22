import { Route } from '@angular/router';

export const pokemonListRoute: Route = {
  path: 'list',
  loadComponent: () =>
    import('../../pages/pokemon-list/pokemon-list.component').then(
      (m) => m.PokemonListComponent
    ),
  title: 'Pokemon list',
  providers: [],
};
