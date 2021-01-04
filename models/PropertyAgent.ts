import mongoose from "mongoose";

export interface PropertyAgentAttrs {
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
}

export interface PropertyAgentDoc extends mongoose.Document {
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
}

export interface PropertyAgentModel extends mongoose.Model<PropertyAgentDoc> {
  build(attrs: PropertyAgentAttrs): PropertyAgentDoc;
}

const PropertyAgentSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Types.ObjectId,
      ref: "Property",
      required: true
    },
    agent: {
      type: mongoose.Types.ObjectId,
      ref: "Agent",
      required: true
    }
  },
  {
    timestamps: true
  }
);

PropertyAgentSchema.statics.build = (
  attrs: PropertyAgentAttrs
): PropertyAgentDoc => {
  return new PropertyAgent(attrs);
};

export const PropertyAgent = mongoose.model<
  PropertyAgentDoc,
  PropertyAgentModel
>("PropertyAgent", PropertyAgentSchema);
