import { AuthenticationError } from "apollo-server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterUserValidation } from "../../middlewares/validation";
import { UserAttrs } from "../../models/User";
import { Context } from "../resolvers";

export const UserMutations = {
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
  },
  async loginUser(
    prt: any,
    args: { email: string; password: string },
    { User }: Context
  ) {
    const user = await User.findOne({ email: args.email.toLowerCase() });
    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(args.password, user.password);
    if (!isMatch) {
      throw new AuthenticationError("Invalid email or password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1 day"
    });
    return {
      token
    };
  }
};
