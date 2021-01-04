import { UserAttrs } from "../models/User";
import validator from "validator";
import { UserInputError } from "apollo-server-express";

export const RegisterUserValidation = (user: UserAttrs) => {
  const { email, password, firstName, lastName } = user;
  if (!validator.isEmail(email)) {
    throw new UserInputError("invalid email");
  }
  if (password.trim().length < 6) {
    throw new UserInputError("password must be six charachers min");
  }
  if (firstName.trim().length === 0) {
    throw new UserInputError("enter a valid first name");
  }
  if (lastName.trim().length === 0) {
    throw new UserInputError("enter a valid first name");
  }
};
