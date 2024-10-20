import { Component } from '@angular/core';
import { pokemonPaths } from '../../routes/pokemon-app.routes';

@Component({
  selector: 'p-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  routes = pokemonPaths;
}
