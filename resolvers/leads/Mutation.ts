import mongoose from "mongoose";
import { Context } from "../resolvers";

export const LeadMutations = {
  async createLead(
    prt: any,
    args: {
      values: {
        email: string;
        fullName: string;
        phoneNumber: number;
        message: string;
        property: mongoose.Types.ObjectId;
      };
    },
    { Lead }: Context
  ) {
    const lead = Lead.build(args.values);
    await lead.save();
    return lead;
  }
};
