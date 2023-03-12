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

    const movies = req.body.moviesIDs || [];

    const purchased = (
      await prisma.purchases.findMany({
        where: {
          OR: movies.map((movieId: string) => ({
            moviesIDs: { has: movieId },
          })),
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

    let finalArray = movies.filter(
      (x: any) => !purchased.includes(x) && !userMoviesInCart.includes(x)
    );

    if (purchased.includes(movies[0])) {
      res.status(401).json("Movie Is Already Purchased");
    } else if (userMoviesInCart.includes(movies[0])) {
      res.status(401).json("Movie Is ALready In Cart");
    } else if (
      !purchased.includes(movies[0]) &&
      !userMoviesInCart.includes(movies[0])
    ) {
      const updateCart = await prisma.cart.update({
        where: {
          userID: userDetails.user.id,
        },
        data: {
          moviesIDs: {
            push: finalArray,
          },
        },
      });

      res.json({ message: "Movie Added To Cart", updateCart });
    }
  }
}
