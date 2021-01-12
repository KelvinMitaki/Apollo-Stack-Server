import { isAgent } from "../../middlewares/authorization";
import { Context } from "../resolvers";

export const PropertyQueries = {
  async fetchProperties(prt: any, args: any, { req, Property }: Context) {
    const agent = await isAgent(req);
    return Property.find({ agent: agent._id }, null, { limit: 10 }).slice(
      "images",
      1
    );
  },
  async fetchAgentProperty(
    prt: any,
    args: { propertyId: string },
    { req, Property }: Context
  ) {
    const agent = await isAgent(req);
    return Property.findOne({ agent: agent._id, _id: args.propertyId });
  },
  async filterProperties(
    prt: any,
    args: { filter: "sale" | "rent" | "furnished" },
    { Property }: Context
  ) {
    let properties;
    if (args.filter === "sale" || args.filter === "rent") {
      properties = await Property.find({ type: args.filter }, null, {
        limit: 10
      }).slice("images", 1);
    }
    if (args.filter === "furnished") {
      properties = await Property.find({ furnished: true }, null, {
        limit: 10
      }).slice("images", 1);
    }
    if (!properties) {
      return [];
    }
    return properties;
  }
};
