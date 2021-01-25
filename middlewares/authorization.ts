import { Request } from "express";
import { Agent, AgentDoc } from "../models/Agent";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "apollo-server-express";
import { User, UserDoc } from "../models/User";

export const isAuthorized = async (req: Request, usr: "user" | "agent") => {
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    throw new ForbiddenError("unauthorized");
  }
  let split_token;
  split_token = req.cookies["client_token"];
  if (!split_token) {
    split_token = req.cookies["token"];
  }
  if (!split_token) {
    throw new ForbiddenError("unauthorized");
  }
  try {
    const token = jwt.verify(split_token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    let user;
    if (usr === "agent") {
      user = (await Agent.findById(token._id)) as AgentDoc | null;
    } else {
      user = await User.findById(token._id);
    }
    if (!user) {
      throw new ForbiddenError("unauthorized");
    }
    return user;
  } catch (error) {
    throw new ForbiddenError("unauthorized");
  }
};
export const editProfileValidation = async (req: Request) => {
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    throw new ForbiddenError("unauthorized");
  }
  let split_token;
  split_token = req.cookies["client_token"];
  if (!split_token) {
    split_token = req.cookies["token"];
  }
  if (!split_token) {
    throw new ForbiddenError("unauthorized");
  }
  try {
    const token = jwt.verify(split_token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    let user;
    user = (await Agent.findById(token._id)) as AgentDoc | null;
    if (!user) {
      user = await User.findById(token._id);
    }

    if (!user) {
      throw new ForbiddenError("unauthorized");
    }
    return user;
  } catch (error) {
    throw new ForbiddenError("unauthorized");
  }
};
