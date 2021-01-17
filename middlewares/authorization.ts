import { Request } from "express";
import { Agent, AgentDoc } from "../models/Agent";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "apollo-server-express";
import { User, UserDoc } from "../models/User";

export const isAuthorized = async (req: Request, usr: "user" | "agent") => {
  if (
    !req.headers.cookie ||
    typeof req.headers.cookie === "undefined" ||
    req.headers.cookie === "undefined" ||
    req.headers.cookie.split("=").length < 2 ||
    req.headers.cookie.split("=")[1].trim().length === 0
  ) {
    throw new ForbiddenError("unauthorized");
  }
  const tokenArr = req.headers.cookie
    .split("; ")
    .map(t => ({ [t.split("=")[0]]: t.split("=")[1] }));
  let split_token;
  split_token = tokenArr.find(
    t =>
      Object.values(t)[0].trim().length !== 0 &&
      Object.keys(t)[0] === "client_token"
  );
  if (!split_token) {
    split_token = tokenArr.find(
      t =>
        Object.values(t)[0].trim().length !== 0 && Object.keys(t)[0] === "token"
    );
  }
  if (!split_token) {
    throw new ForbiddenError("unauthorized");
  }
  try {
    const token = jwt.verify(
      Object.values(split_token)[0],
      process.env.JWT_SECRET!
    ) as {
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
