import jwt from "jsonwebtoken";
import { getSharedUser } from "../../create-shared-user";
import { prisma } from "../../../pages/api/graphql";

// TODO put this secret into .env and load via .env npm module
const jwtSecret = "shhhhh";

export async function login() {
  const user = await getSharedUser(prisma);
  console.log(process.env.JWT_SECRET);
  return {
    jwt: jwt.sign({ userId: user.id }, jwtSecret),
  };
}
