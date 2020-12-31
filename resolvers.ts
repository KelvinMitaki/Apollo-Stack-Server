import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { User, UserAttrs } from "./models/User";
import { RegisterUserValidation } from "./validation";
import bcrypt from "bcrypt";

export interface Context {
  req: Request;
  User: typeof User;
}

export const resolvers = {
  Query: {
    async users(prt: any, args: any, { User }: Context) {
      const users = await User.find();
      return users;
    }
  },
  Mutation: {
    async registerUser(
      prt: any,
      args: { values: UserAttrs },
      { User, req }: Context
    ) {
      RegisterUserValidation(args.values);
      const userExist = await User.findOne({
        email: args.values.email.toLowerCase()
      });
      if (userExist) {
        throw new AuthenticationError("A user with that email already exists");
      }
      try {
        args.values.password = await bcrypt.hash(args.values.password, 10);
      } catch (error) {
        throw new Error("Error hashing password");
      }
      args.values.email = args.values.email.toLowerCase();
      const user = User.build(args.values);
      await user.save();
      return user;
    }
  }
};
