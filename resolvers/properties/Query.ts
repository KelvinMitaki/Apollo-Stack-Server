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
    if (args.filter === "sale" || args.filter === "rent") {
      properties = await Property.find({ type: args.filter }, null, {
        limit: args.limit,
        skip: args.offset
      }).slice("images", 1);
    }
    if (args.filter === "furnished") {
      properties = await Property.find({ furnished: true }, null, {
        limit: args.limit,
        skip: args.offset
      }).slice("images", 1);
    }
    if (!properties) {
      return [];
    }
    return properties;
  },
  filterPropertiesCount(
    prt: any,
    args: {
      filter: "sale" | "rent" | "furnished";
    },
    { Property }: Context
  ) {
    if (args.filter === "rent" || args.filter === "sale") {
      return { count: Property.countDocuments({ type: args.filter }) };
    }
    if (args.filter === "furnished") {
      return { count: Property.countDocuments({ furnished: true }) };
    }
    return { count: 0 };
  },
  fetchPropertyDetails(prt: any, args: { _id: string }, { Property }: Context) {
    return Property.findById(args._id, null, { populate: "agent" });
  },
  async agentPropertiesCount(prt: any, args: any, { Property, req }: Context) {
    const agent = await isAgent(req);
    return { count: Property.countDocuments({ agent: agent._id }) };
  }
};
