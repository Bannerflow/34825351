import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAppLayoutComponent } from './pokemon-app-layout.component';

describe('PokemonAppLayoutComponent', () => {
  let component: PokemonAppLayoutComponent;
  let fixture: ComponentFixture<PokemonAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonAppLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
