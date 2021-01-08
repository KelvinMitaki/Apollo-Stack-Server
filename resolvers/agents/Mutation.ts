import { AuthenticationError } from "apollo-server-express";
import { RegisterAgentValidation } from "../../middlewares/validation";
import { AgentAttrs } from "../../models/Agent";
import { Context } from "../resolvers";
import bcrypt from "bcrypt";

export const AgentMutations = {
  async registerAgent(
    prt: any,
    args: { values: AgentAttrs },
    { User, Agent }: Context
  ) {
    RegisterAgentValidation(args.values);
    let userExists;
    userExists = await Agent.findOne({
      email: args.values.email.toLowerCase()
    });
    if (!userExists) {
      userExists = await User.findOne({
        email: args.values.email.toLowerCase()
      });
    }
    if (userExists) {
      throw new AuthenticationError("A user with that email already exists");
    }
    try {
      args.values.password = await bcrypt.hash(args.values.password, 10);
    } catch (error) {
      throw new Error("Error hashing password");
    }
    args.values.email = args.values.email.toLowerCase();
    const agent = Agent.build(args.values);
    await agent.save();
    return agent;
  }
};
