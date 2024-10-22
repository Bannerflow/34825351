import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PokemonAppLayoutComponent } from './pokemon-app-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { pokemonRoutes } from './pokemon-app.routes';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [PokemonAppLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    RouterModule.forChild(pokemonRoutes),
    StoreModule,
  ],
  providers: [],
})
export class PokemonAppLayoutModule {}
