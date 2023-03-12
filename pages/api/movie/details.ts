import { NextApiRequest , NextApiResponse } from "next";
import axios from 'axios'

export default async function movieDetails(req: NextApiRequest , res: NextApiResponse){
    const movieID = req?.body?.movieID

    if(movieID){
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=010b85a5594b639d99d3ea642bd45c74`)
        .then(data => {
            res.json(data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

// async function fetchData(movieId: any){
//   const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=010b85a5594b639d99d3ea642bd45c74`)
    
//     try{
//         return data.results
//     }

//     catch (err) {
//         console.log(err)
//     }
// }