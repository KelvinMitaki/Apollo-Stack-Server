import mongoose from "mongoose";

export interface AgentAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
  profilePhoto?: string;
}

export interface AgentDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
  profilePhoto?: string;
  isVerified: boolean;
  isAgent: boolean;
}

export interface AgentModel extends mongoose.Model<AgentDoc> {
  build(attrs: AgentAttrs): AgentDoc;
}

const AgentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    profilePhoto: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isAgent: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      }
    },
    timestamps: true
  }
);

AgentSchema.statics.build = (attrs: AgentAttrs): AgentDoc => {
  return new Agent(attrs);
};

export const Agent = mongoose.model<AgentDoc, AgentModel>("Agent", AgentSchema);
