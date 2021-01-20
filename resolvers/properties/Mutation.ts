import { ForbiddenError } from "apollo-server-express";
import { isAuthorized } from "../../middlewares/authorization";
import {
  AddPropertyValidation,
  EditPropertyValidation
} from "../../middlewares/validation";
import { AgentDoc } from "../../models/Agent";
import { PropertyAttrs, PropertyDoc } from "../../models/Property";
import { Context } from "../resolvers";

export const PropertyMutations = {
  async addProperty(
    prt: any,
    args: { values: PropertyAttrs },
    { req, Property }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    AddPropertyValidation(args.values);
    args.values.agent = agent._id;
    for (let prop in args.values) {
      // @ts-ignore
      typeof args.values[prop] === "string"
        ? // @ts-ignore
          (args.values[prop] as string).trim().toLowerCase()
        : // @ts-ignore
          args.values[prop];
    }
    const property = Property.build(args.values);
    await property.save();
    return { ...property.toObject(), agent };
  },
  async editProperty(
    prt: any,
    args: { values: PropertyAttrs },
    { req, Property }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    EditPropertyValidation(args.values);
    const propertyToEdit: PropertyDoc = await Property.findOne({
      _id: args.values._id,
      agent: agent._id
    });
    if (!propertyToEdit) {
      throw new ForbiddenError("not allowed");
    }
    for (const editedProp in args.values) {
      // @ts-ignore
      propertyToEdit[editedProp] =
        // @ts-ignore
        typeof args.values[editedProp] === "string"
          ? // @ts-ignore
            (args.values[editedProp] as string).trim().toLowerCase()
          : // @ts-ignore
            args.values[editedProp];
    }
    await propertyToEdit.save();
    return propertyToEdit;
  },
  async updateExpiredListings(
    prt: any,
    args: {
      values: { _id: string; type: "sale" | "rent" }[];
      expiryDate?: boolean;
      mark?: boolean;
      withdraw?: boolean;
    },
    { req, Property }: Context
  ) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    const sale = args.values
      .filter(val => val.type === "sale")
      .map(val => val._id);
    const rent = args.values
      .filter(val => val.type === "rent")
      .map(val => val._id);
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    if (sale && sale.length !== 0) {
      if (args.mark) {
        await Property.updateMany(
          { _id: { $in: sale }, agent: agent._id },
          { status: "sold" }
        );
      }
      if (args.withdraw) {
        await Property.updateMany(
          { _id: { $in: sale }, agent: agent._id },
          { withdrawn: true }
        );
      }
      if (args.expiryDate) {
        await Property.updateMany(
          { _id: { $in: sale }, agent: agent._id },
          { expiryDate: d }
        );
      }
    }
    if (rent && rent.length !== 0) {
      if (args.mark) {
        await Property.updateMany(
          { _id: { $in: rent }, agent: agent._id },
          { status: "rented" }
        );
      }
      if (args.withdraw) {
        await Property.updateMany(
          { _id: { $in: rent }, agent: agent._id },
          { withdrawn: true }
        );
      }
      if (args.expiryDate) {
        await Property.updateMany(
          { _id: { $in: rent }, agent: agent._id },
          { expiryDate: d }
        );
      }
    }
    return null;
  }
};
