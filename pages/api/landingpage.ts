// import { NextApiRequest , NextApiResponse } from "next";
// import axios from "axios";

// const popularArray: any[] = []
// const popularMoviesOfAllTimeArray: any[] = []
// const popularTvShowsArray: any[] = []
// const popularTvShowsOfAllTimeArray: any[] = []

// const landingPageArray: any[] = []

// class newObj {
//     title: string
//     id: any
//     array: string
//     constructor(title:string , id:any , array:any){
//         this.title = title,
//         this.id = id,
//         this.array = array
//     }
// }

// const testArray: any[] = [
// {
//     id: Math.floor(Math.random() * 10),
//     title: "Trending Movies's",
//     popularArray
// },
// {
//     id: Math.floor(Math.random() * 100),
//     title: "Top Rated Movies's Of All Time's",
//     popularMoviesOfAllTimeArray
// },
// {
//     id: Math.floor(Math.random() * 1000),
//     title: "Trending Tv Show's",
//     popularTvShowsArray
// },
// {
//     id: Math.floor(Math.random() * 10000),
//     title: "Top Rated Tv Shows Of All Time",
//     popularTvShowsOfAllTimeArray
// }
// ]

// export default function landingpage(req: NextApiRequest , res: NextApiResponse){

//     trendingMovies()
//     popularMoviesOfAllTime()
//     popularTvShows()
//     popularTvShowsOfAllTime()

//     if(popularArray.length > 1 && popularMoviesOfAllTimeArray.length > 1 && popularTvShowsArray.length > 1 && popularTvShowsOfAllTimeArray.length > 1){

//     const trendingMovies = new newObj("Trending Movies's" , Math.floor(Math.random() * 10) , popularArray)

//     const popularMovies = new newObj("Top Rated Movies's Of All Time's" , Math.floor(Math.random() * 100) , popularMoviesOfAllTimeArray)

//     const trendingTv = new newObj("Trending Tv Show's" , Math.floor(Math.random() * 1000) , popularTvShowsArray)

//     const PopularTv = new newObj("Top Rated Tv Shows Of All Time" , Math.floor(Math.random() * 10000) , popularTvShowsOfAllTimeArray)

//     landingPageArray.push(trendingMovies , popularMovies, trendingTv, PopularTv)
//     res.json(landingPageArray)

//     }

//     else{
//         res.json(false)
//     }

// }

// function trendingMovies(){
//     axios.get("https://api.themoviedb.org/3/discover/movie?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
//     .then(data => {

//      const dataExist = data?.data?.results

//     if(dataExist){

//        for(let i = 0 ; i<= 8 ; i++){
//            popularArray.push(dataExist[i])
//        }

//     }
//     else{
//        return
//     }

//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

// function popularMoviesOfAllTime(){
//     axios.get("https://api.themoviedb.org/3/discover/movie?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1")
// .then(data => {

//  const dataExist = data?.data?.results

// if(dataExist){

//    for(let i = 0 ; i<= 8 ; i++){
//     popularMoviesOfAllTimeArray.push(dataExist[i])
//    }

// }
// else{
//     return
// }

// })
// .catch(err => {
//     console.log(err)
// })
// }

// function popularTvShows(){
//     axios.get("https://api.themoviedb.org/3/tv/popular?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&page=1")
// .then(data => {

//  const dataExist = data?.data?.results

// if(dataExist){

//    for(let i = 0 ; i<= 8 ; i++){
//     popularTvShowsArray.push(dataExist[i])
//    }

// }
// else{
//     return
// }

// })
// .catch(err => {
//     console.log(err)
// })
// }

// function popularTvShowsOfAllTime(){
//     axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&page=1")
// .then(data => {

//  const dataExist = data?.data?.results

// if(dataExist){

//    for(let i = 0 ; i<= 8 ; i++){
//     popularTvShowsOfAllTimeArray.push(dataExist[i])
//    }

// }
// else{
//     return
// }

// })
// .catch(err => {
//     console.log(err)
// })
// }

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
