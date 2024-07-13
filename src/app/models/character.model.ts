export interface Character {
  vehicles: string[];
  url: string;
  id: string;
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicleDetails: Vehicles[]
  speciesDetails: Species[];
  filmDetails: Film[];
  starshipDetails: Starship[];
}
export interface Species {
  name: string;
}

export interface Vehicles {
  name: string;
}

export interface Film {
  title: string;
}

export interface Starship {
  name: string;
}
