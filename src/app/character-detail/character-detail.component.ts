import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: Character | undefined;
  speciesNames: string = '';
  filmTitles: string = '';
  starshipNames: string = '';

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.swapiService.getCharacter(id).subscribe((character: Character) => {
    //     this.character = character;
    //     this.speciesNames = this.getSpeciesNames(character);
    //     this.filmTitles = this.getFilmTitles(character);
    //     this.starshipNames = this.getStarshipNames(character);
    //   });
    // }
  }

  getSpeciesNames(character: Character): string {
    return character.speciesDetails?.map(s => s.name).join(', ') || '';
  }

  getFilmTitles(character: Character): string {
    return character.filmDetails?.map(f => f.title).join(', ') || '';
  }

  getStarshipNames(character: Character): string {
    return character.starshipDetails?.map(ss => ss.name).join(', ') || '';
  }
}
