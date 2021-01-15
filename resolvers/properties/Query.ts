import { isAgent } from "../../middlewares/authorization";
import { Context } from "../resolvers";

export const PropertyQueries = {
  async fetchAgentProperties(prt: any, args: any, { req, Property }: Context) {
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
    args: {
      filter: "sale" | "rent" | "furnished";
      offset: number;
      limit: number;
    },
    { Property }: Context
  ) {
    let properties;
    let count;
    if (args.filter === "sale" || args.filter === "rent") {
      properties = await Property.find({ type: args.filter }, null, {
        limit: args.limit,
        skip: args.offset
      }).slice("images", 1);
      count = await Property.countDocuments({ type: args.filter });
    }
    if (args.filter === "furnished") {
      properties = await Property.find({ furnished: true }, null, {
        limit: args.limit,
        skip: args.offset
      }).slice("images", 1);
      count = await Property.countDocuments({ furnished: true });
    }
    if (!properties) {
      return [
        {
          properties: [],
          count: 0
        }
      ];
    }
    return [{ properties, count }];
  },
  fetchPropertyDetails(prt: any, args: { _id: string }, { Property }: Context) {
    return Property.findById(args._id, null, { populate: "agent" });
  }
};
