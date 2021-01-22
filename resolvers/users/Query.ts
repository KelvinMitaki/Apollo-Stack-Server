import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { Context } from "../resolvers";

export const UserQueries = {
  async currentUser(prt: any, args: any, { User, req, Agent }: Context) {
    if (!req.cookies || Object.keys(req.cookies).length === 0) {
      return null;
    }
    let split_token;
    split_token = req.cookies["client_token"];
    if (!split_token) {
      return (split_token = req.cookies["token"]);
    }
    if (!split_token) {
      return null;
    }
    try {
      const token = jwt.verify(split_token, process.env.JWT_SECRET!) as {
        _id: string;
      };

      let user;
      user = await User.findById(token._id);
      if (!user) {
        user = await Agent.findById(token._id);
      }
      return user;
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
  logoutUser(prt: any, args: any, { res }: Context) {
    res.clearCookie("token", {
      ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
      secure: process.env.NODE_ENV !== "development"
    });
    return null;
  }
};
