import mongoose from "mongoose";

export interface VisitorAttrs {
  property: mongoose.Types.ObjectId;
}

export interface VisitorDoc extends mongoose.Document {
  property: mongoose.Types.ObjectId;
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
