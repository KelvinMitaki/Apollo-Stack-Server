import mongoose from "mongoose";

export interface LeadAttrs {
  email: string;
  fullName: string;
  phoneNumber: number;
  message: string;
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
}

export interface LeadDoc extends mongoose.Document {
  email: string;
  fullName: string;
  phoneNumber: number;
  message: string;
  property: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface LeadModel extends mongoose.Model<LeadDoc> {
  build(attrs: LeadAttrs): LeadDoc;
}

const LeadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    property: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Property"
    },
    agent: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Agent"
    }
  },
  {
    timestamps: true
  }
);

LeadSchema.statics.build = (attrs: LeadAttrs): LeadDoc => {
  return new Lead(attrs);
};

export const Lead = mongoose.model<LeadDoc, LeadModel>("Lead", LeadSchema);
