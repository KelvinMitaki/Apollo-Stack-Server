import mongoose from "mongoose";
import { isAuthorized } from "../../middlewares/authorization";
import { AgentDoc } from "../../models/Agent";
import { PropertyDoc } from "../../models/Property";
import { Context } from "../resolvers";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const PropertyQueries = {
  async fetchAgentProperties(
    prt: any,
    args: {
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
        furnished?: boolean;
      };
    },
    { req, Property }: Context
  ) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    if (!args.values) {
      return Property.find({ agent: agent._id }, null, {
        limit: args.limit,
        skip: args.offset
      }).slice("images", 1);
    }
    if (args.values) {
      const {
        type,
        category,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        furnished
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
      if (typeof furnished === "boolean") {
        search.furnished = furnished;
      }
      return Property.find({ ...search, agent: agent._id }, null, {
        skip: args.offset,
        limit: args.limit
      }).slice("images", 1);
    }
    return [];
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
        furnished?: boolean;
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
        bathrooms,
        furnished
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
      if (typeof furnished === "boolean") {
        search.furnished = furnished;
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
        furnished?: boolean;
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
        bathrooms,
        furnished
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
      if (typeof furnished === "boolean") {
        search.furnished = furnished;
      }
      return {
        count: Property.countDocuments(search)
      };
    }
    return { count: 0 };
  },
  async fetchPropertyDetails(
    prt: any,
    args: { _id: mongoose.Types.ObjectId },
    { Property, req, Visitor, res }: Context
  ) {
    if (!req.cookies["visitor"] && !req.cookies["client_visitor"]) {
      const property: PropertyDoc = await Property.findById(args._id, null, {
        populate: "agent"
      });
      const visitor = Visitor.build({
        property: args._id,
        month: months[new Date().getMonth()],
        agent: ((property.agent as unknown) as AgentDoc)._id
      });
      await visitor.save();
      res.cookie("visitor", visitor._id, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 5000),
        ...(process.env.NODE_ENV !== "development" && { sameSite: "none" }),
        secure: process.env.NODE_ENV !== "development"
      });
      return { ...property.toObject(), visitor: visitor._id };
    }
    return Property.findById(args._id, null, { populate: "agent" });
  },
  async agentPropertiesCount(
    prt: any,
    args: {
      values?: {
        type?: "sale" | "rent";
        category?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
        furnished?: boolean;
      };
    },
    { Property, req }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    if (!args.values) {
      return { count: Property.countDocuments({ agent: agent._id }) };
    }
    if (args.values) {
      const {
        type,
        category,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        furnished
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
      if (typeof furnished === "boolean") {
        search.furnished = furnished;
      }
      return {
        count: Property.countDocuments(search)
      };
    }

    return {
      count: 0
    };
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
        furnished?: boolean;
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
      bathrooms,
      furnished
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
    if (furnished) {
      search.furnished = true;
    }
    return Property.find(search, null, {
      skip: args.offset,
      limit: args.limit
    }).slice("images", 1);
  },
  async fetchExpiredListings(
    prt: any,
    args: {
      values?: {
        type?: "sale" | "rent";
        category?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
        furnished?: boolean;
      };
      offset: number;
      limit: number;
    },
    { Property, req }: Context
  ) {
    const agent: AgentDoc = await isAuthorized(req, "agent");
    if (!args.values) {
      return Property.find(
        { agent: agent._id, expiryDate: { $lt: new Date() } },
        null,
        { skip: args.offset, limit: args.limit }
      ).slice("images", 1);
    }
    if (args.values) {
      const {
        type,
        category,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        furnished
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
      if (furnished) {
        search.furnished = true;
      }
      return Property.find(
        { ...search, agent: agent._id, expiryDate: { $lt: new Date() } },
        null,
        {
          skip: args.offset,
          limit: args.limit
        }
      ).slice("images", 1);
    }
  },
  async expiredListingsCount(
    prt: any,
    args: {
      values?: {
        type?: "sale" | "rent";
        category?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
        furnished?: boolean;
      };
    },
    { Property, req }: Context
  ) {
    const agent = await isAuthorized(req, "agent");
    if (!args.values) {
      return {
        count: Property.countDocuments({
          agent: agent._id,
          expiryDate: { $lt: new Date() }
        })
      };
    }
    if (args.values) {
      const {
        type,
        category,
        location,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        furnished
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
      if (typeof furnished === "boolean") {
        search.furnished = furnished;
      }
      return {
        count: Property.countDocuments({
          ...search,
          expiryDate: { $lt: new Date() }
        })
      };
    }

    return {
      count: 0
    };
  }
};
