import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character | undefined;

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCharacterDetails(id);
      }
    });
  }

  loadCharacterDetails(id: string): void {
    this.swapiService.getCharacterById(id).subscribe(character => {
      this.character = character;
    });
  }
}
