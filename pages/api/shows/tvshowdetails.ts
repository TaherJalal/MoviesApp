import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'

export default async function tvShowDetails(req: NextApiRequest , res: NextApiResponse){
    const tvShowId = req.body.tvshowId
    if(tvShowId)
    axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US`)
    .then(data => {
        res.json(data.data)
    })
    .catch(err => {
        console.log(err)
    })
}


