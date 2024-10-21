import { Route } from '@angular/router';

export const pokemonDetailRoute: Route = {
  path: 'show/:id',
  loadComponent: () =>
    import('./pokemon-detail.component').then((m) => m.PokemonDetailComponent),
  title: 'Pokemon Detail',
};
