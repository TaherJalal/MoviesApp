import { AuthorizedUser } from "@/types";
import jwtDecode from "jwt-decode";
import { prisma } from "../../lib/prisma";

export default async function authUser(token: string) {
  const { id }: AuthorizedUser = jwtDecode(token);

  const user = await prisma.user.findUniqueOrThrow({ where: { id } });

  return {
    id,
    isAdmin: user.role === "ADMIN",
  };
}
