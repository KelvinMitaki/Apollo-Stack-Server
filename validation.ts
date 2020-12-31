import { UserAttrs } from "./models/User";
import validator from "validator";
import { UserInputError } from "apollo-server";

export const RegisterUserValidation = (user: UserAttrs) => {
  const { email, password, fullName } = user;
  if (!validator.isEmail(email)) {
    throw new UserInputError("invalid email");
  }
  if (password.trim().length < 6) {
    throw new UserInputError("password must be six charachers min");
  }
  if (fullName.trim().length === 0) {
    throw new UserInputError("enter a valid full name");
  }
};
