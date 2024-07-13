import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap, toArray, switchMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api/';

  private filmsMap: { [url: string]: string } = {};
  private speciesMap: { [url: string]: string } = {};
  private vehiclesMap: { [url: string]: string } = {};
  private starshipsMap: { [url: string]: string } = {};

  private vehiclesCache: any[] = [];
  private starshipsCache: any[] = [];

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

    this.fetchAllVehicles().subscribe(vehicles => {
      vehicles.forEach((vehicle: any) => {
        this.vehiclesMap[vehicle.url] = vehicle.name;
      });
    });

    this.fetchAllStarships().subscribe(starships => {
      starships.forEach((starship: any) => {
        this.starshipsMap[starship.url] = starship.name;
      });
    });
  }

  private fetchAllVehicles(): Observable<any[]> {
    if (this.vehiclesCache.length > 0) {
      return of(this.vehiclesCache);
    }

    return this.http.get<any>(`${this.apiUrl}vehicles/`).pipe(
      switchMap(response => {
        const totalPages = Math.ceil(response.count / response.results.length);
        const requests = [];

        for (let i = 1; i <= totalPages; i++) {
          requests.push(this.http.get<any>(`${this.apiUrl}vehicles/?page=${i}`));
        }

        return forkJoin(requests);
      }),
      map(responses => responses.flatMap(response => response.results)),
      tap(results => this.vehiclesCache = results)
    );
  }

  private fetchAllStarships(): Observable<any[]> {
    if (this.starshipsCache.length > 0) {
      return of(this.starshipsCache);
    }

    return this.http.get<any>(`${this.apiUrl}starships/`).pipe(
      switchMap(response => {
        const totalPages = Math.ceil(response.count / response.results.length);
        const requests = [];

        for (let i = 1; i <= totalPages; i++) {
          requests.push(this.http.get<any>(`${this.apiUrl}starships/?page=${i}`));
        }

        return forkJoin(requests);
      }),
      map(responses => responses.flatMap(response => response.results)),
      tap(results => this.starshipsCache = results)
    );
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
