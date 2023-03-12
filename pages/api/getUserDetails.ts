import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import axios, { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";

export default async function getUserDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = req.headers["authorization"];
  const API_KEY = process.env.API_KEY;

  if (token) {
    let userDetails: any = jwtDecode(token as string);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userDetails.data.id,
      },
      include: {
        wishlist: true,
        cart: true,
      },
    });

    const getMovie = async (id: string) => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      return data;
    };

    if (user) {
      const wishlistMovies: any = await Promise.all(
        user.wishlist!.moviesIDs.map(async (id) => await getMovie(id))
      );
      const cartMovies: any = await Promise.all(
        user.cart!.moviesIDs.map(async (id) => await getMovie(id))
      );
      res.json({ wishlist: wishlistMovies, cart: cartMovies, user });
    } else {
      res.status(404).json("Something wrong happened");
    }

    const purchasedMovies = await prisma.purchases.findUniqueOrThrow({
      where: {
        userID: userDetails.user.id,
      },
    });

    console.log(purchasedMovies);
  }
}
