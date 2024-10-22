import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import {
  selectHasNext,
  selectHasPrev,
  selectPokemonListLoading,
  selectViewPokemons,
} from '../../store/pokemon-list/pokemon-list.selectors';
import { Pokemon } from '../../shared/models/pokemon.model';
import { listInitialPokemonAction } from '../../store/pokemon-list/pokemon-list.actions';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let store: MockStore;
  let selectViewPokemonsMock: MemoizedSelector<any, any, any>;
  let selectHasNextMock: MemoizedSelector<any, any, any>;
  let selectHasPrevMock: MemoizedSelector<any, any, any>;
  let mockPokemonList: Pokemon[] = [
    {
      id: '1',
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      mainImage: 'mainImageUrl1',
      dreamImage: 'dreamImageUrl1',
    },
    {
      id: '2',
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
      mainImage: 'mainImageUrl2',
      dreamImage: 'dreamImageUrl2',
    },
    {
      id: '3',
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
      mainImage: 'mainImageUrl3',
      dreamImage: 'dreamImageUrl3',
    },
  ];

  let mockPokemonList2: Pokemon[] = [
    {
      id: '4',
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
      mainImage: 'mainImageUrl4',
      dreamImage: 'dreamImageUrl4',
    },
    {
      id: '5',
      name: 'charmeleon',
      url: 'https://pokeapi.co/api/v2/pokemon/5/',
      mainImage: 'mainImageUrl5',
      dreamImage: 'dreamImageUrl5',
    },
    {
      id: '6',
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
      mainImage: 'mainImageUrl6',
      dreamImage: 'dreamImageUrl6',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    selectViewPokemonsMock = store.overrideSelector(
      selectViewPokemons,
      mockPokemonList
    );
    selectHasNextMock = store.overrideSelector(selectHasNext, true);
    selectHasPrevMock = store.overrideSelector(selectHasPrev, false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of Pokémon', () => {
    fixture.detectChanges();

    const pokemonElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('[data-testid="pokemon-card"]')
    );
    expect(pokemonElements.length).toBe(3);
    expect(pokemonElements[0].nativeElement.textContent).toContain('Bulbasaur');
    expect(pokemonElements[1].nativeElement.textContent).toContain('Ivysaur');
    expect(pokemonElements[2].nativeElement.textContent).toContain('Venusaur');
  });

  it('should dispatch listInitialPokemonAction when component initializes', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(listInitialPokemonAction());
  });

  it('should display loading spinner while loading', () => {
    store.overrideSelector(selectPokemonListLoading, true);
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('[data-testid="loading-spinner"]')
    );
    expect(loadingElement).toBeTruthy();
  });

  it('should call goToNextPage when Next button is clicked', waitForAsync(() => {
    store.overrideSelector(selectPokemonListLoading, false);
    fixture.detectChanges();

    spyOn(component, 'goToNextPage').and.callThrough();

    const pokemonElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('[data-testid="pokemon-card"]')
    );
    expect(pokemonElements.length).toBe(3);
    expect(pokemonElements[0].nativeElement.textContent).toContain('Bulbasaur');

    const nextButton = fixture.debugElement.query(
      By.css('[data-testid="next-button"]')
    );
    nextButton.triggerEventHandler('click', null);

    expect(component.goToNextPage).toHaveBeenCalled();

    selectViewPokemonsMock.setResult(mockPokemonList2);
    selectHasNextMock.setResult(false);
    selectHasPrevMock.setResult(true);
    store.refreshState();
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      fixture.detectChanges();

      const pokemonElements: DebugElement[] = fixture.debugElement.queryAll(
        By.css('[data-testid="pokemon-card"]')
      );
      const nextButtonElement: DebugElement[] = fixture.debugElement.queryAll(
        By.css('[data-testid="next-button"]')
      );
      const prevButtonElement: DebugElement[] = fixture.debugElement.queryAll(
        By.css('[data-testid="prev-button"]')
      );
      expect(nextButtonElement[0].attributes['disabled']).toBeDefined();
      expect(prevButtonElement[0].attributes['disabled']).not.toBeDefined();
      expect(pokemonElements.length).toBe(3);
      expect(pokemonElements[0].nativeElement.textContent).toContain(
        'Charmander'
      );
      expect(pokemonElements[1].nativeElement.textContent).toContain(
        'Charmeleon'
      );
      expect(pokemonElements[2].nativeElement.textContent).toContain(
        'Charizard'
      );
    });
  }));

  it('should call goToPreviousPage when Next button is clicked', waitForAsync(() => {
    store.overrideSelector(selectPokemonListLoading, false);
    fixture.detectChanges();

    spyOn(component, 'goToPreviousPage').and.callThrough();

    const pokemonElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('[data-testid="pokemon-card"]')
    );
    expect(pokemonElements.length).toBe(3);
    expect(pokemonElements[0].nativeElement.textContent).toContain('Bulbasaur');

    const nextButton = fixture.debugElement.query(
      By.css('[data-testid="prev-button"]')
    );
    nextButton.triggerEventHandler('click', null);

    expect(component.goToPreviousPage).toHaveBeenCalled();

    selectViewPokemonsMock.setResult(mockPokemonList2);
    selectHasNextMock.setResult(true);
    selectHasPrevMock.setResult(false);
    store.refreshState();
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      fixture.detectChanges();

      const pokemonElements: DebugElement[] = fixture.debugElement.queryAll(
        By.css('[data-testid="pokemon-card"]')
      );
      const nextButtonElement: DebugElement[] = fixture.debugElement.queryAll(
        By.css('[data-testid="next-button"]')
      );
      const prevButtonElement: DebugElement[] = fixture.debugElement.queryAll(
        By.css('[data-testid="prev-button"]')
      );
      expect(nextButtonElement[0].attributes['disabled']).not.toBeDefined();
      expect(prevButtonElement[0].attributes['disabled']).toBeDefined();
      expect(pokemonElements.length).toBe(3);
      expect(pokemonElements[0].nativeElement.textContent).toContain(
        'Charmander'
      );
      expect(pokemonElements[1].nativeElement.textContent).toContain(
        'Charmeleon'
      );
      expect(pokemonElements[2].nativeElement.textContent).toContain(
        'Charizard'
      );
    });
  }));
});
