import { Component, OnInit } from '@angular/core';
import { SwapiService } from './swapi.service';
import { Character } from './models/character.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  movies: string[] = [];
  species: string[] = [];
  vehicles: string[] = [];
  starships: string[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  birthYears: string[] = [];
  isInDetailView: boolean= false;

  constructor(private swapiService: SwapiService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {

    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      console.log('Navigation event:', event); // Log the navigation event
      this.isInDetailView = event.urlAfterRedirects.includes('/characters/');
      console.log('isInDetailView:', this.isInDetailView); // Log the flag value
    });


    this.loadCharacters();
    
  }

  loadCharacters(page: number = 1): void {
    this.swapiService.getCharacters(page).subscribe(data => {
      this.characters = data.results;
      this.filteredCharacters = data.results;
      this.totalPages = Math.ceil(data.count / 10); // Assuming 10 results per page
      this.extractFilters(data.results);
    });
  }

  extractFilters(characters: Character[]): void {
    const moviesSet = new Set<string>();
    const speciesSet = new Set<string>();
    const vehiclesSet = new Set<string>();
    const starshipsSet = new Set<string>();
    const birthYearsSet = new Set<string>();

    characters.forEach(character => {
      character.films.forEach(film => moviesSet.add(film));
      character.species.forEach(specie => speciesSet.add(specie));
      character.vehicles.forEach(vehicle => vehiclesSet.add(vehicle));
      character.starships.forEach(starship => starshipsSet.add(starship));
      birthYearsSet.add(character.birth_year);
    });

    this.movies = Array.from(moviesSet);
    this.species = Array.from(speciesSet);
    this.vehicles = Array.from(vehiclesSet);
    this.starships = Array.from(starshipsSet);
    this.birthYears = Array.from(birthYearsSet).sort();

    console.log('Extracted birth years:', this.birthYears);
  }

  applyFilter(filter: any): void {
    const { movie, species, vehicle, starship, birthYearRange } = filter;

    this.filteredCharacters = this.characters.filter(character => {
      return (!movie || character.films.includes(movie)) &&
             (!species || character.species.includes(species)) &&
             (!vehicle || character.vehicles.includes(vehicle)) &&
             (!starship || character.starships.includes(starship)) &&
             (!birthYearRange.start || character.birth_year >= birthYearRange.start) &&
             (!birthYearRange.end || character.birth_year <= birthYearRange.end);
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters(page);
    }
  }
}
