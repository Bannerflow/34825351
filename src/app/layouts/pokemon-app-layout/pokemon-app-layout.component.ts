import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { pokemonRoutes } from '../../shared/routes/pokemon-app.routes';
import { RouterOutlet, ROUTES } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'p-pokemon-app-layout',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterOutlet],
  providers: [
    {
      provide: ROUTES,
      useValue: pokemonRoutes,
    },
  ],
  templateUrl: './pokemon-app-layout.component.html',
})
export class PokemonAppLayoutComponent {}
