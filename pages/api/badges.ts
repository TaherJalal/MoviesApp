import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwtDecode from "jwt-decode";

const BADGES = {
  obama: {
    id: 1,
    name: "Obama",
    url: "/badges/obama.png",
  },
  phoenix: {
    id: 2,
    name: "/Phoenix",
    url: "/badges/phoenix.jpg",
  },
  putin: {
    id: 3,
    name: "/Putin",
    url: "/badges/phoenix.jpg",
  },
  yuda: {
    id: 2,
    name: "/Yuda",
    url: "/badges/yuda.webp",
  },
};

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
      res.send(BADGES.obama.url);
    }

    if (userPurchases.moviesIDs.length > 1) {
      res.send(BADGES.putin.url);
    }

    if (userPurchases.moviesIDs.length > 5) {
      res.send(BADGES.phoenix.url);
    }

    if (userPurchases.moviesIDs.length > 10) {
      res.send(BADGES.yuda.url);
    }
  }
}
