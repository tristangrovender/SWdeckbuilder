import jwt from "jsonwebtoken";
import { getSharedUser } from "../../create-shared-user";
import { prisma } from "../../../pages/api/graphql";
import { handler } from "../../decode-verify-jwt";

export async function login(_parent, _args) {
  const result = await handler({ token: _args.awsJWTToken });
  console.log("result!", result);

  const user = await getSharedUser(prisma);
  // console.log(process.env.JWT_SECRET);
  return {
    jwt: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
  };
}
