import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PokemonDetails } from '../../shared/models/pokemon.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PokemonDetailService } from './pokemon-detail.service';
import { catchError, finalize, Observable, Subscription, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { pokemonPaths } from '../../layouts/pokemon-app-layout/pokemon-app.routes';
import { CoreModule } from '../../core/core.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'p-pokemon-detail',
  standalone: true,
  imports: [CommonModule, SharedModule, CoreModule],
  providers: [PokemonDetailService],
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemonDetails$: Observable<PokemonDetails | null>;
  pokemonEvolutions$: Observable<PokemonDetails[]>;
  loadingDetails = true;
  loadingEvolutions = true;
  paramMapSub: Subscription | null = null;
  errorText: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonDetailService: PokemonDetailService,
    private router: Router,
    private title: Title
  ) {
    this.pokemonDetails$ = this.pokemonDetailService.pokemonDetails$;
    this.pokemonEvolutions$ = this.pokemonDetailService.pokemonEvolutions$;
  }

  ngOnInit(): void {
    this.paramMapSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadPokemonDetails(id);
        this.loadPokemonEvolutions(id);
      }
    });
  }

  /**
   * Fetches the Pokemon detail and sets loading and errors
   */
  private loadPokemonDetails(id: string) {
    this.loadingDetails = true;
    this.errorText = null;
    this.pokemonDetailService
      .loadPokemonDetails(id)
      .pipe(
        tap((details) => {
          this.loadingDetails = false;
          this.title.setTitle(details.name);
        }),
        catchError((error) => {
          this.loadingDetails = false;
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorText = 'Pokémon does not exist.';
              return error;
            }
          }
          this.errorText = 'Could not fetch the Pokémon.';
          // Report the error to error handler (Sentry)
          console.error(error);
          return error;
        })
      )
      .subscribe();
  }

  /**
   * Fetches the Pokemon evolutions and sets loadings
   * @param id id of the pokemon
   */
  private loadPokemonEvolutions(id: string) {
    this.loadingDetails = true;

    this.pokemonDetailService
      .loadPokemonEvolutionChain(id)
      .pipe(
        tap(() => (this.loadingEvolutions = false)),
        catchError((error) => {
          this.loadingEvolutions = false;
          if (!this.errorText) this.errorText = 'Error loading evolutions.';
          console.error(error);
          return error;
        })
      )
      .subscribe();
  }

  goToDetailsPage(id: string): void {
    this.router.navigate([pokemonPaths.showOne(id)]);
  }

  ngOnDestroy(): void {
    this.paramMapSub?.unsubscribe();
  }
}
