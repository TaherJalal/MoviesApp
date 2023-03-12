import { NextApiRequest , NextApiResponse } from "next";
import axios from 'axios'

export default async function moviePage(req: NextApiRequest , res: NextApiResponse){
 const pageNumber = req.body.page

 if(pageNumber && pageNumber > 0){
        res.json(await fetchData(pageNumber))
    }
    
}

async function fetchData(pageNumber:any){
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=010b85a5594b639d99d3ea642bd45c74&language=en-US&sort_by=original_title.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`)
    
    try {
        return data.results
    }

    catch(err){
        ( console.log(err))
    }
}


