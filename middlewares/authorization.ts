import { Request } from "express";
import { Agent, AgentDoc } from "../models/Agent";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "apollo-server-express";

export const isAgent = async (req: Request) => {
  if (
    !req.headers.cookie ||
    typeof req.headers.cookie === "undefined" ||
    req.headers.cookie === "undefined" ||
    req.headers.cookie.split("=").length < 2 ||
    req.headers.cookie.split("=")[1].trim().length === 0
  ) {
    throw new ForbiddenError("unauthorized");
  }
  const split_token = req.headers.cookie
    .split("; ")
    .map(t => ({ [t.split("=")[0]]: t.split("=")[1] }))
    .find(
      t =>
        Object.values(t)[0].trim().length !== 0 &&
        (Object.keys(t)[0] === "token" || Object.keys(t)[0] === "client_token")
    );
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
    const agent = (await Agent.findById(token._id)) as AgentDoc | null;
    if (!agent) {
      throw new ForbiddenError("unauthorized");
    }
    return agent;
  } catch (error) {
    throw new ForbiddenError("unauthorized");
  }
};