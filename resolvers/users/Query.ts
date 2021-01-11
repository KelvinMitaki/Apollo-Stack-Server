import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { Context } from "../resolvers";

export const UserQueries = {
  async currentUser(prt: any, args: any, { User, req, Agent }: Context) {
    if (
      !req.headers.cookie ||
      typeof req.headers.cookie === "undefined" ||
      req.headers.cookie === "undefined" ||
      req.headers.cookie.split("=").length < 2 ||
      req.headers.cookie.split("=")[1].trim().length === 0
    ) {
      return null;
    }
    console.log("cookie", req.headers.cookie);
    let split_token;
    split_token = req.headers.cookie
      .split("; ")
      .map(t => ({ [t.split("=")[0]]: t.split("=")[1] }))
      .filter(
        t =>
          Object.values(t)[0].trim().length !== 0 &&
          (Object.keys(t)[0] === "token" ||
            Object.keys(t)[0] === "client_token")
      );
    if (!split_token || (split_token && split_token.length === 0)) {
      return null;
    }
    if (split_token.length > 1) {
      // split_token=split_token.find(t=>)
    }
    try {
      const token = jwt.verify(
        Object.values(split_token[0])[0],
        process.env.JWT_SECRET!
      ) as {
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
  users(prt: any, args: any, { User }: Context) {
    return User.find();
  },
  logoutUser(prt: any, args: any, { res }: Context) {
    res.clearCookie("token", {
      ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
      secure: process.env.NODE_ENV !== "development"
    });
    return null;
  }
};
