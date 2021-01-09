import { isAgent } from "../../middlewares/authorization";
import { PropertyAttrs } from "../../models/Property";
import { Context } from "../resolvers";

export const PropertyMutations = {
  async addProperty(
    prt: any,
    args: { values: PropertyAttrs },
    { req }: Context
  ) {
    const agent = await isAgent(req);
    // const property=await
  }
};
