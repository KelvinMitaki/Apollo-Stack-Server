import mongoose from "mongoose";

export interface UserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema(
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
      type: Number
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

UserSchema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
