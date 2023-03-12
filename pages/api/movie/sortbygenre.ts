import { NextApiRequest , NextApiResponse } from "next";
import axios from 'axios';

export default async function sortMovieByGenre(req: NextApiRequest , res:NextApiResponse){
    res.json(await fetchData(req.body.genreId))
}

async function fetchData(genre:any){
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=010b85a5594b639d99d3ea642bd45c74&sort_by=popularity.desc&page=1&with_genres=${genre}`)
    return data.results
}