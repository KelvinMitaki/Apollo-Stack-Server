import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  editProfileValidation,
  isAuthorized
} from "../../middlewares/authorization";
import {
  EditProfileValidation,
  RegisterUserValidation
} from "../../middlewares/validation";
import { AgentAttrs, AgentDoc } from "../../models/Agent";
import { UserAttrs, UserDoc } from "../../models/User";
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
      expiresIn: "7 days"
    });
    // req.session!.token = token;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
      secure: process.env.NODE_ENV !== "development"
    });
    return { token };
  },
  async editProfile(prt: any, args: { values: AgentAttrs }, { req }: Context) {
    const user = (await editProfileValidation(req)) as AgentDoc;
    EditProfileValidation(args.values, user.isAgent ? true : false);
    // @ts-ignore
    delete args.values.email;
    for (let prop in args.values) {
      // @ts-ignore
      user[prop] = args.values[prop];
    }
    await user.save();
    return user;
  }
};
