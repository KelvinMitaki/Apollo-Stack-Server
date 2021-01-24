import mongoose from "mongoose";

export interface VisitorPropertiesAttrs {
  month: string;
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  visitor: mongoose.Types.ObjectId;
}

export interface VisitorPropertiesDoc extends mongoose.Document {
  month: string;
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  visitor: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface VisitorPropertiesModel
  extends mongoose.Model<VisitorPropertiesDoc> {
  build(attrs: VisitorPropertiesAttrs): VisitorPropertiesDoc;
}

const VisitorPropertiesSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Property"
    },
    agent: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Agent"
    },
    visitor: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Visitor"
    },
    month: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

VisitorPropertiesSchema.statics.build = (
  attrs: VisitorPropertiesAttrs
): VisitorPropertiesDoc => {
  return new VisitorProperties(attrs);
};

export const VisitorProperties = mongoose.model<
  VisitorPropertiesDoc,
  VisitorPropertiesModel
>("VisitorProperties", VisitorPropertiesSchema);
