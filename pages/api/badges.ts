import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwtDecode from "jwt-decode";
import obama from "../../static/badges/obama.png";

export default async function badges(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let token: any = req.headers["authorization"];

  if (token) {
    let userDetails: any = jwtDecode(token as string);

    const userPurchases = await prisma.purchases.findUniqueOrThrow({
      where: {
        userID: userDetails.user.id,
      },
    });

    if (userPurchases.moviesIDs.length > 0) {
      console.log(obama);
    }
  }
}
