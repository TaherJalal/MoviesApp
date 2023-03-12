import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import authUser from "@/components/helpers/auth";

export default async function addDiscount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers["authorization"];

  if (!token) {
    // else
    return;
  }

  const { id, isAdmin } = await authUser(token);

  if (!isAdmin) {
    res.status(401).json({ message: "Not an admin" });
  }

  try {
    const data = await prisma.discount.create({
      data: {
        user: { connect: { id } },
        amount: req.body.amount,
        code: req.body.code,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}
