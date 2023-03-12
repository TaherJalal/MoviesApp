import { NextApiRequest , NextApiResponse } from "next";
import axios from 'axios'
const API_KEY = process.env.API_KEY
if(!API_KEY) throw Error('API key is not provided!')
export default async function(req: NextApiRequest , res: NextApiResponse){

    const movie = req.body.movie.replaceAll(" " , "+")
    res.json(await fetchData(movie))
}

async function fetchData(movie:any) {
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`)  
    return data.results
}