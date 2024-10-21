import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-pokemon-img',
  templateUrl: './pokemon-img.component.html',
})
export class PokemonImgComponent {
  @Input() name: string = '';
  @Input() mainImage: string = '';
  @Input() dreamImage: string | undefined = undefined;

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
}
