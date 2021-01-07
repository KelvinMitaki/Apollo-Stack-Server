import jwt from "jsonwebtoken";
import { Context } from "../resolvers";

export const UserQueries = {
  async currentUser(prt: any, args: any, { User, req }: Context) {
    if (!req.headers.cookie) {
      return null;
    }
    console.log(req.headers.cookie);
    const token = jwt.verify(
      req.headers.cookie.split("=")[1],
      process.env.JWT_SECRET!
    ) as {
      _id: string;
    };
    const user = await User.findById(token._id);
    return user;
  },
  users(prt: any, args: any, { User }: Context) {
    return User.find();
  }
};
