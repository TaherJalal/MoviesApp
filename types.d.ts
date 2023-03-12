

export interface LandingPage {
    id:     number;
    title:  string;
    movies: Movie[];
}

export interface Movie {
    adult?:            boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title?:   string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date?:     Date;
    title?:            string;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    first_air_date?:   Date;
    name?:             string;
    origin_country?:   string[];
    original_name?:    string;
}

export type AuthorizedUser {
    id: string
}