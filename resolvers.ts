import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { User, UserAttrs } from "./models/User";
import { RegisterUserValidation } from "./validation";
import bcrypt from "bcrypt";

const users = [
  {
    _id: Math.round(Math.random() * 100000000).toString(),
    fullName: "Kate Chopin",
    email: "kate@gmail.com",
    password: "kevinmitaki"
  },
  {
    _id: Math.round(Math.random() * 100000000).toString(),
    fullName: "Paul Auster",
    email: "paul@gmail.com",
    password: "kevinmitaki"
  }
];

export interface Context {
  req: Request;
  User: typeof User;
}

export const resolvers = {
  Query: {
    users(prt: any, args: any, ctx: Context) {
      return users;
    }
  },
  Mutation: {
    async registerUser(prt: any, args: UserAttrs, { User, req }: Context) {
      RegisterUserValidation(args);
      const userExist = await User.findOne({
        email: args.email.toLocaleLowerCase()
      });
      if (userExist) {
        throw new AuthenticationError("A user with that email already exists");
      }
      try {
        args.password = await bcrypt.hash(args.password, 10);
      } catch (error) {
        throw new Error("Error hashing password");
      }
      const user = User.build(args);
      user.save();
      return user;
    }
  }
};
