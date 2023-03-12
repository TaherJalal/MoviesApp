import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import authUser from "@/components/helpers/auth";

export default async function addToBalance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.json("UnAuthorized");
  }

  const { id } = await authUser(token);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      balance: req.body.addBalance + 100,
    },
  });

  res.json("Balance Added");
}
