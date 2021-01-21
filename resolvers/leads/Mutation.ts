import mongoose from "mongoose";
import { CreateLeadValidation } from "../../middlewares/validation";
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
        agent: mongoose.Types.ObjectId;
      };
    },
    { Lead }: Context
  ) {
    CreateLeadValidation(args.values);
    args.values.email = args.values.email.trim().toLowerCase();
    const lead = Lead.build(args.values);
    await lead.save();
    return lead;
  }
};
