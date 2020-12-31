import mongoose from "mongoose";

export interface UserAttrs {
  email: string;
  password: string;
  fullName: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        console.log(ret);
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
