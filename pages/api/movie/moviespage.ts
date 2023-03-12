import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
// import { request } from "http";
const API_KEY = process.env.API_KEY
if(!API_KEY) throw Error('...')

export default async function moviePage(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const pageNumber = req.query.page || 1
   const searchText = req.query.search
   const genreId = req.query.genre || null
   console.log('pageNumber',pageNumber)
  try {
    if(!searchText){
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate&with_genres=${genreId}`
    );
    res.json(data);
    }else{
      const {data} = await axios.get(
       `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&query=${searchText}&with_genres=${genreId}`
       );
       res.json(data);
      }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
