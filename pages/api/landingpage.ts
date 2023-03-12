import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function landingpage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json([
    {
      id: Math.floor(Math.random() * 10),
      title: "Trending Movie's",
      movies: await trendingMovies(),
    },
    {
      id: Math.floor(Math.random() * 100),
      title: "Top Rated Movie's Of All Time's",
      movies: await popularMoviesOfAllTime(),
    },
    {
      id: Math.floor(Math.random() * 1000),
      title: "Trending Tv Show's",
      movies: await popularTvShows(),
    },
    {
      id: Math.floor(Math.random() * 10000),
      title: "Top Rated Tv Shows Of All Time",
      movies: await popularTvShowsOfAllTime(),
    },
  ]);
}

async function trendingMovies() {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
  );

  data.results.map(
    (movie: any) =>
      (movie.poster_path =
        "https://image.tmdb.org/t/p/original" + movie.poster_path)
  );

  return data.results;
}

async function popularMoviesOfAllTime() {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1"
  );

  data.results.map(
    (movie: any) =>
      (movie.poster_path =
        "https://image.tmdb.org/t/p/original" + movie.poster_path)
  );

  return data.results;
}

async function popularTvShows() {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&page=1"
  );

  data.results.map(
    (movie: any) =>
      (movie.poster_path =
        "https://image.tmdb.org/t/p/original" + movie.poster_path)
  );

  return data.results;
}

async function popularTvShowsOfAllTime() {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&page=1"
  );

  data.results.map(
    (movie: any) =>
      (movie.poster_path =
        "https://image.tmdb.org/t/p/original" + movie.poster_path)
  );

  return data.results;
}
