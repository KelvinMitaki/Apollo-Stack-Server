import { ForbiddenError } from "apollo-server-express";
import { isAuthorized } from "../../middlewares/authorization";
import {
  AddPropertyValidation,
  EditPropertyValidation
} from "../../middlewares/validation";
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
      propertyToEdit[editedProp] = args.values[editedProp];
    }
    await propertyToEdit.save();
    return propertyToEdit;
  }
};
