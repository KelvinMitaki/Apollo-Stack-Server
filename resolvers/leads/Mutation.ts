import mongoose from "mongoose";
import { CreateLeadValidation } from "../../middlewares/validation";
import { months } from "../properties/Query";
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
    const month = months[new Date().getMonth()];
    CreateLeadValidation({ ...args.values, month });
    args.values.email = args.values.email.trim().toLowerCase();
    const lead = Lead.build({ ...args.values, month });
    await lead.save();
    return lead;
  }
};
