import jwt from "jsonwebtoken";
import { prisma } from "../../../pages/api/graphql";
import { handler } from "../../decode-verify-jwt";
import { secrets } from "../../load-secrets";

export async function login(_parent, _args) {
  const { error, userName } = await handler({ token: _args.awsJWTToken });
  if (error) {
    throw new Error("Error while logging in: " + JSON.stringify(error));
  }

  let user = await prisma.user.findOne({
    where: {
      username: userName,
    },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: userName,
      },
    });
  }

  return {
    jwt: jwt.sign({ userId: user.id }, secrets.JWT_SECRET),
  };
}
