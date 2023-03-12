import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwtDecode from "jwt-decode";

export default async function previousPurchases(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = req.headers["authorization"];

  if (token) {
    let userDetails: any = jwtDecode(token as string);
    await prisma.purchases
      .findMany({
        where: {
          userID: userDetails.data.id,
        },
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
