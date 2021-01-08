import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterUserValidation } from "../../middlewares/validation";
import { UserAttrs } from "../../models/User";
import { Context } from "../resolvers";

export const UserMutations = {
  async registerUser(
    prt: any,
    args: { values: UserAttrs },
    { User, Agent, req }: Context
  ) {
    RegisterUserValidation(args.values);
    let userExist;
    userExist = await User.findOne({
      email: args.values.email.toLowerCase()
    });
    if (!userExist) {
      userExist = await Agent.findOne({
        email: args.values.email.toLowerCase()
      });
    }
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
    { User, Agent, req, res }: Context
  ) {
    let user;
    user = await User.findOne({ email: args.email.toLowerCase() });
    if (!user) {
      user = await Agent.findOne({ email: args.email.toLowerCase() });
    }
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
    // req.session!.token = token;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
      secure: process.env.NODE_ENV !== "development"
    });
    return { token };
  }
};
