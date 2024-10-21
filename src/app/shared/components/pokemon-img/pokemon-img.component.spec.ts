import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonImgComponent } from './pokemon-img.component';

describe('PokemonImgComponent', () => {
  let component: PokemonImgComponent;
  let fixture: ComponentFixture<PokemonImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
