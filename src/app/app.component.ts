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
    
  }


}
