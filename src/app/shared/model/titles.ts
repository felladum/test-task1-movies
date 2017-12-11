export interface Title {
  Poster: string;
  Title: string;
  Type: string;
  Year: number;
  imdbID: string;
}

export interface SrchTitles {
  Response: string;
  totalResults: number;
  Search: Title[];
}
