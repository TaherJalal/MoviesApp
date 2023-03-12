import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwtDecode from "jwt-decode";

export default async function addToCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = req.headers["authorization"];

  if (token) {
    let userDetails: any = jwtDecode(token as string);

    const movies: string[] = req.body.moviesIDs || [];

    // const movie = 'fdfd'

    const purchased = (
      await prisma.purchases.findMany({
        where: {
          OR: movies.map((movieId) => ({
            moviesIDs: { has: movieId },
          })),
          // moviesIDs: {
          //   has: movie
          // },
          userID: userDetails.user.id,
        },
      })
    ).flatMap(({ moviesIDs }) => moviesIDs);

    const alreadyInCart = await prisma.cart.findUniqueOrThrow({
      where: {
        userID: userDetails.user.id,
      },
    });

    let userMoviesInCart = alreadyInCart.moviesIDs;
    const isInCart = alreadyInCart.moviesIDs.includes(movies[0]);
    const isPurchased = purchased.includes(movies[0]);

    let finalArray = movies.filter(
      (x) => !purchased.includes(x) && !userMoviesInCart.includes(x)
    );

    if (isPurchased) {
      return res.status(401).json("Movie Is Already Purchased");
    } else if (isInCart) {
      return res.status(401).json("Movie Is ALready In Cart");
    }

    await prisma.cart.update({
      where: {
        userID: userDetails.user.id,
      },
      data: {
        moviesIDs: {
          push: finalArray,
        },
      },
    });

    res.send("Movie Added To Cart");
  }
}
