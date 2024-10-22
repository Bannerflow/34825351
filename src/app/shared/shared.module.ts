import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { PokemonImgComponent } from './components/pokemon-img/pokemon-img.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    PokemonImgComponent,
  ],
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    PokemonImgComponent,
  ],
})
export class SharedModule {}
