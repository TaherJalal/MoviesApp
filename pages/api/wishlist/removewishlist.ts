import { NextApiRequest, NextApiResponse } from "next";
import jwtDecode from "jwt-decode";
import { prisma } from "../../lib/prisma";

export default async function removeFromWishlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = req.headers["authorization"];

  if (token) {
    let userDetails: any = jwtDecode(token as string);
    const movies = req.body.moviesIDs;

    const wishlist = await prisma.wishlist.findUniqueOrThrow({
      where: {
        userID: userDetails.data.id,
      },
    });

    const moviesInWishlist = wishlist.moviesIDs;

    const finalArray = moviesInWishlist.filter((x: any) => !movies.includes(x));

    const removeWishList = await prisma.wishlist.update({
      where: {
        userID: userDetails.data.id,
      },
      data: {
        moviesIDs: finalArray,
      },
    });
    res.json(removeWishList);
  }
}
