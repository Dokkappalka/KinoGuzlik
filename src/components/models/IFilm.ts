interface FilmRating {
  kp: number
}

interface FilmVotes {
  kp: number
}

interface FilmPoster {
  url: string
}

interface IFilmDocs {
  id: number
  rating: FilmRating
  votes: FilmVotes
  name: string
  alternativeName: string
  year: number
  description: string
  shortDescription: string
  poster: FilmPoster | null
}

export interface IFilm {
  docs: IFilmDocs[]
  pages: number
  page: number
}
