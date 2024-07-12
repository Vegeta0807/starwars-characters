import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api/';

  private filmsMap: { [url: string]: string } = {};
  private speciesMap: { [url: string]: string } = {};
  private vehiclesMap: { [url: string]: string } = {};
  private starshipsMap: { [url: string]: string } = {};

  constructor(private http: HttpClient) {
    this.fetchDetails();
  }

  private fetchDetails(): void {
    this.http.get<any>(`${this.apiUrl}films/`).subscribe(response => {
      response.results.forEach((film: any) => {
        this.filmsMap[film.url] = film.title;
      });
    });

    this.http.get<any>(`${this.apiUrl}species/`).subscribe(response => {
      response.results.forEach((specie: any) => {
        this.speciesMap[specie.url] = specie.name;
      });
    });

    this.http.get<any>(`${this.apiUrl}vehicles/`).subscribe(response => {
      response.results.forEach((vehicle: any) => {
        this.vehiclesMap[vehicle.url] = vehicle.name;
      });
    });

    this.http.get<any>(`${this.apiUrl}starships/`).subscribe(response => {
      response.results.forEach((starship: any) => {
        this.starshipsMap[starship.url] = starship.name;
      });
    });
  }

  getFilmName(url: string): string {
    return this.filmsMap[url] || url; // Return URL if name not found (fallback)
  }

  getSpecieName(url: string): string {
    return this.speciesMap[url] || url; // Return URL if name not found (fallback)
  }

  getVehicleName(url: string): string {
    return this.vehiclesMap[url] || url; // Return URL if name not found (fallback)
  }

  getStarshipName(url: string): string {
    return this.starshipsMap[url] || url; // Return URL if name not found (fallback)
  }

  getCharacters(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}people/?page=${page}`);
  }
}
