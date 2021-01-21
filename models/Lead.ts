import mongoose from "mongoose";

export interface LeadAttrs {
  email: string;
  fullName: string;
  phoneNumber: number;
  message: string;
}

export interface LeadDoc extends mongoose.Document {
  email: string;
  fullName: string;
  phoneNumber: number;
  message: string;
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
