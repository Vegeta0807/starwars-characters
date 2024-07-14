import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() movies: string[] = [];
  @Input() species: string[] = [];
  @Input() vehicles: string[] = [];
  @Input() starships: string[] = [];
  @Input() birthYears: string[] = [];

  @Output() filterChanged = new EventEmitter<any>();

  filter = {
    movie: '',
    species: '',
    vehicle: '',
    starship: '',
    birthYearRange: { start: '', end: '' }
  };
  isOpen = false;

  constructor(private swapiService: SwapiService) {}

  getFilmName(url: string): string {
    return this.swapiService.getFilmName(url);
  }

  getSpecieName(url: string): string {
    return this.swapiService.getSpecieName(url);
  }

  getVehicleName(url: string): string {
    return this.swapiService.getVehicleName(url);
  }

  getStarshipName(url: string): string {
    return this.swapiService.getStarshipName(url);
  }

  applyFilter() {
    this.filterChanged.emit(this.filter);
  }

  toggleSelect(selectElement: HTMLSelectElement): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      selectElement.parentElement?.classList.add('open');
    } else {
      selectElement.parentElement?.classList.remove('open');
    }
  }
}
