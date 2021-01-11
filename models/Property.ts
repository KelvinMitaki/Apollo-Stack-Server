import mongoose, { QueryOptions } from "mongoose";

export interface PropertyAttrs {
  _id?: string;
  reference: number;
  location: string;
  streetAddress: string;
  category: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: string;
  agent: mongoose.Types.ObjectId;
  heading: string;
  description: string;
  expiryDate: Date;
  images: string[];
  parkingLots?: number;
  plinthArea?: number;
  lotArea?: number;
  furnished?: boolean;
  petFriendly?: boolean;
  garden?: boolean;
  serviceCharge?: number;
  repossessed?: boolean;
  onAuction?: boolean;
  auctionDate?: Date;
  auctionVenue?: string;
}
export interface PropertyDoc extends mongoose.Document {
  reference: number;
  location: string;
  streetAddress: string;
  category: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: string;
  agent: mongoose.Types.ObjectId;
  heading: string;
  description: string;
  expiryDate: Date;
  images: string[];
  parkingLots?: number;
  plinthArea?: number;
  lotArea?: number;
  furnished?: boolean;
  petFriendly?: boolean;
  garden?: boolean;
  serviceCharge?: number;
  repossessed?: boolean;
  onAuction?: boolean;
  auctionDate?: Date;
  auctionVenue?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyModel extends mongoose.Model<PropertyDoc> {
  build(attrs: PropertyAttrs): PropertyDoc;
}

const PropertySchema = new mongoose.Schema(
  {
    reference: {
      type: Number,
      required: true,
      unique: true
    },
    location: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    category: { type: String, required: true },
    price: {
      type: Number,
      required: true
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    agent: { type: mongoose.Types.ObjectId, ref: "Agent", required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    expiryDate: {
      type: Date,
      required: true
    },
    images: {
      type: [String],
      required: true
    },
    parkingLots: {
      type: Number
    },
    plinthArea: {
      type: Number
    },
    lotArea: {
      type: Number
    },
    furnished: {
      type: Boolean,
      default: false
    },
    petFriendly: {
      type: Boolean,
      default: false
    },
    garden: {
      type: Boolean,
      default: false
    },
    serviceCharge: {
      type: Number
    },
    repossessed: {
      type: Boolean,
      default: false
    },
    onAuction: {
      type: Boolean,
      default: false
    },
    auctionDate: {
      type: Date
    },
    auctionVenue: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

PropertySchema.statics.build = (attrs: PropertyAttrs): PropertyDoc => {
  return new Property(attrs);
};

export const Property = mongoose.model<PropertyDoc, PropertyModel>(
  "Property",
  PropertySchema
);
