import { Component, Input, OnChanges } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnChanges {
  @Input() characters: Character[] = [];

  currentPage: number = 1;
  totalPages: number = 0;

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.characters.length / 10);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
    }
  }

  get paginatedCharacters(): Character[] {
    const start = (this.currentPage - 1) * 10;
    const end = start + 10;
    return this.characters.slice(start, end);
  }

  getSpeciesNumbers(speciesUrls: string[]): string {
    return speciesUrls.map(url => url.split('/').slice(-2, -1)[0]).join(', ');
  }
}
