import { isAgent } from "../../middlewares/authorization";
import { AddPropertyValidation } from "../../middlewares/validation";
import { PropertyAttrs } from "../../models/Property";
import { Context } from "../resolvers";

export const PropertyMutations = {
  async addProperty(
    prt: any,
    args: { values: PropertyAttrs },
    { req, Property }: Context
  ) {
    const agent = await isAgent(req);
    AddPropertyValidation(args.values);
    args.values.agent = agent._id;
    const property = Property.build(args.values);
    await property.save();
    // const props=await (Property.findById(property._id) as typeof Property).populate()
    return { ...property.toObject(), agent };
  }
};
