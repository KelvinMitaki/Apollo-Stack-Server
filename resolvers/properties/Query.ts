import { isAuthorized } from "../../middlewares/authorization";
import { PropertyDoc } from "../../models/Property";
import { Context } from "../resolvers";

export const PropertyQueries = {
  async fetchAgentProperties(
    prt: any,
    args: { offset: number; limit: number },
    { req, Property }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    return Property.find({ agent: agent._id }, null, {
      limit: args.limit,
      skip: args.offset
    }).slice("images", 1);
  },
  async fetchAgentProperty(
    prt: any,
    args: { propertyId: string },
    { req, Property }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    return Property.findOne({ agent: agent._id, _id: args.propertyId });
  },
  async filterProperties(
    prt: any,
    args: {
      filter?: "sale" | "rent" | "furnished";
      offset: number;
      limit: number;
      values?: {
        type?: "sale" | "rent";
        category?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
      };
    },
    { Property }: Context
  ) {
    if (!args.values) {
      if (args.filter === "sale" || args.filter === "rent") {
        return Property.find({ type: args.filter }, null, {
          limit: args.limit,
          skip: args.offset
        }).slice("images", 1);
      }
      if (args.filter === "furnished") {
        return Property.find({ furnished: true }, null, {
          limit: args.limit,
          skip: args.offset
        }).slice("images", 1);
      }
    }
    if (args.values) {
      const {
        type,
        category,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms
      } = args.values;
      const search = {} as { [key: string]: any };

      if (type) {
        search.type = type;
      }
      if (category) {
        search.category = category;
      }
      if (minPrice) {
        (search as { [key: string]: any }).price = {
          ...(search as { [key: string]: any }).price,
          $gte: minPrice
        };
      }
      if (maxPrice) {
        (search as { [key: string]: any }).price = {
          ...(search as { [key: string]: any }).price,
          $lte: maxPrice
        };
      }
      if (bedrooms) {
        search.bedrooms = { $gte: bedrooms };
      }
      if (bathrooms) {
        search.bathrooms = { $gte: bathrooms };
      }
      if (location) {
        (search as { [key: string]: any }).$or = [
          { location },
          { streetAddress: location }
        ];
      }
      return Property.find(search, null, {
        skip: args.offset,
        limit: args.limit
      }).slice("images", 1);
    }
    return [];
  },
  filterPropertiesCount(
    prt: any,
    args: {
      filter?: "sale" | "rent" | "furnished";
      values?: {
        type?: "sale" | "rent";
        category?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
      };
    },
    { Property }: Context
  ) {
    if (!args.values) {
      if (args.filter === "rent" || args.filter === "sale") {
        return { count: Property.countDocuments({ type: args.filter }) };
      }
      if (args.filter === "furnished") {
        return { count: Property.countDocuments({ furnished: true }) };
      }
    }
    if (args.values) {
      const {
        type,
        category,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms
      } = args.values;
      const search = {} as { [key: string]: any };
      if (type) {
        search.type = type;
      }
      if (category) {
        search.category = category;
      }
      if (minPrice) {
        (search as { [key: string]: any }).price = {
          ...(search as { [key: string]: any }).price,
          $gte: minPrice
        };
      }
      if (maxPrice) {
        (search as { [key: string]: any }).price = {
          ...(search as { [key: string]: any }).price,
          $lte: maxPrice
        };
      }
      if (bedrooms) {
        search.bedrooms = { $gte: bedrooms };
      }
      if (bathrooms) {
        search.bathrooms = { $gte: bathrooms };
      }
      if (location) {
        (search as { [key: string]: any }).$or = [
          { location, streetAddress: location }
        ];
      }
      return {
        count: Property.countDocuments(search)
      };
    }
    return { count: 0 };
  },
  fetchPropertyDetails(prt: any, args: { _id: string }, { Property }: Context) {
    return Property.findById(args._id, null, { populate: "agent" });
  },
  async agentPropertiesCount(prt: any, args: any, { Property, req }: Context) {
    const agent = await isAuthorized(req, "agent");
    return { count: Property.countDocuments({ agent: agent._id }) };
  },
  async searchProperties(
    prt: any,
    args: {
      values: {
        type?: "sale" | "rent";
        category?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
      };
      offset: number;
      limit: number;
    },
    { Property }: Context
  ) {
    const {
      type,
      category,
      location,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms
    } = args.values;
    const search = {} as typeof args.values | { [key: string]: any };

    if (type) {
      search.type = type;
    }
    if (category) {
      search.category = category;
    }
    if (minPrice) {
      (search as { [key: string]: any }).price = {
        ...(search as { [key: string]: any }).price,
        $gte: minPrice
      };
    }
    if (maxPrice) {
      (search as { [key: string]: any }).price = {
        ...(search as { [key: string]: any }).price,
        $lte: maxPrice
      };
    }
    if (bedrooms) {
      search.bedrooms = { $gte: bedrooms };
    }
    if (bathrooms) {
      search.bathrooms = { $gte: bathrooms };
    }
    if (location) {
      (search as { [key: string]: any }).$or = [
        { location },
        { streetAddress: location }
      ];
    }
    return Property.find(search, null, {
      skip: args.offset,
      limit: args.limit
    }).slice("images", 1);
  }
};
