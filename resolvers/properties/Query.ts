import { isAgent } from "../../middlewares/authorization";
import { Context } from "../resolvers";

export const PropertyQueries = {
  async fetchProperties(prt: any, args: any, { req, Property }: Context) {
    const agent = await isAgent(req);
    return Property.find({ agent: agent._id }, null, { limit: 10 }).slice(
      "images",
      1
    );
  }
};
