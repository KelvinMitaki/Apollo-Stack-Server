import jwt from "jsonwebtoken";
import { Context } from "../resolvers";

export const UserQueries = {
  async currentUser(prt: any, args: any, { User, req }: Context) {
    if (!req.session!.token) {
      return null;
    }
    const token = jwt.verify(req.session!.token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    const user = await User.findById(token._id);
    return user;
  },
  users(prt: any, args: any, { User }: Context) {
    return User.find();
  }
};
