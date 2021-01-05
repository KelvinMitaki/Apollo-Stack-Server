import jwt from "jsonwebtoken";
import { Context } from "../resolvers";

export const UserQueries = {
  async currentUser(prt: any, args: any, { User, req }: Context) {
    // if (!req.headers.authorization) {
    //   return null;
    // }
    // const token = jwt.verify(
    //   req.headers.authorization.split(" ")[1],
    //   process.env.JWT_SECRET!
    // );
    console.log(req.headers);
    const user = await User.findOne();
    return user;
  },
  users(prt: any, args: any, { User }: Context) {
    return User.find();
  }
};
