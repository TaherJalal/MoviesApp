import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import jwtDecode from "jwt-decode";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token: any = req.headers["authorization"];

  if (token) {
    let userDetails: any = jwtDecode(token as string);
    const userCart = await prisma.cart.findUniqueOrThrow({
      where: {
        userID: userDetails.data.id,
      },
    });

    const userBalance = await prisma.user.findUniqueOrThrow({
      where: {
        id: userDetails.data.id,
      },
    });

    const data = {
      userCart: userCart.moviesIDs,
      userBalance: userBalance.balance,
    };

    res.json(data);
  }
}
