import mongoose from "mongoose";

export interface VisitorAttrs {
  month: string;
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
}

export interface VisitorDoc extends mongoose.Document {
  month: string;
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface VisitorModel extends mongoose.Model<VisitorDoc> {
  build(attrs: VisitorAttrs): VisitorDoc;
}

const VisitorSchema = new mongoose.Schema(
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
    month: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

VisitorSchema.statics.build = (attrs: VisitorAttrs): VisitorDoc => {
  return new Visitor(attrs);
};

export const Visitor = mongoose.model<VisitorDoc, VisitorModel>(
  "Visitor",
  VisitorSchema
);
