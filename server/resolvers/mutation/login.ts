import jwt from "jsonwebtoken";
import { getSharedUser } from "../../create-shared-user";
import { prisma } from "../../../pages/api/graphql";

export async function login() {
  const user = await getSharedUser(prisma);
  console.log(process.env.JWT_SECRET);
  return {
    jwt: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
  };
}
