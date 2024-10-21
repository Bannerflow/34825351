import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../shared/models/pokemon.model';
import {
  selectHasNext,
  selectHasPrev,
  selectPokemonListLoading,
  selectViewPokemons,
} from '../../store/pokemon-list/pokemon-list.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  goToNextPageAction,
  goToPrevPageAction,
  listInitialPokemonAction,
} from '../../store/pokemon-list/pokemon-list.actions';
import { Router } from '@angular/router';
import { pokemonPaths } from '../../layouts/pokemon-app-layout/pokemon-app.routes';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'p-pokemon-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  pokemons$: Observable<Pokemon[]>;
  hasNext$: Observable<Boolean>;
  hasPrev$: Observable<Boolean>;
  loading$: Observable<Boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.store.dispatch(listInitialPokemonAction());
    this.pokemons$ = this.store.select(selectViewPokemons);
    this.hasNext$ = this.store.select(selectHasNext);
    this.hasPrev$ = this.store.select(selectHasPrev);
    this.loading$ = this.store.select(selectPokemonListLoading);
  }

  /**
   * Replaces the pokemon image with the main image if the dream image load was failed
   * @param event load failed event to get the image target
   * @param mainImageUrl main image url to replace
   */
  handlePokemonImageError(event: Event, mainImageUrl: string): void {
    if (
      event.target &&
      'src' in event?.target &&
      event.target.src !== mainImageUrl
    ) {
      event.target.src = mainImageUrl;
    }
  }

  /**
   * Dispatch an action to go to the next page and load the next page is not loaded
   */
  goToNextPage(): void {
    this.store.dispatch(goToNextPageAction());
  }

  /**
   * Dispatch an action to go to the previous page and load the next page is not loaded
   */
  goToPreviousPage(): void {
    this.store.dispatch(goToPrevPageAction());
  }

  goToDetailsPage(id: string): void {
    console.log('ddd');
    this.router.navigate([pokemonPaths.showOne(id)]);
  }
}
