import { NextApiRequest , NextApiResponse } from "next";
import axios from "axios";

export default async function sortTvShowsByGenre(req: NextApiRequest , res: NextApiResponse){

    let tvShowId = req.body.tvShow

    res.json(await fetchData(tvShowId))

}

async function fetchData(tvShowId:any) {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=010b85a5594b639d99d3ea642bd45c74&sort_by=popularity.desc&page=1&with_genres=${tvShowId}`)
    return data.results
}