import { UserAttrs } from "../models/User";
import validator from "validator";
import { UserInputError } from "apollo-server-express";
import { AgentAttrs } from "../models/Agent";

export const RegisterUserValidation = (user: UserAttrs) => {
  const { email, password, firstName, lastName } = user;
  if (!email || (email && !validator.isEmail(email))) {
    throw new UserInputError("invalid email");
  }
  if (!password || (password && password.trim().length < 6)) {
    throw new UserInputError("password must be six charachers min");
  }
  if (!firstName || (firstName && firstName.trim().length === 0)) {
    throw new UserInputError("enter a valid first name");
  }
  if (!lastName || (lastName && lastName.trim().length === 0)) {
    throw new UserInputError("enter a valid first name");
  }
};
export const RegisterAgentValidation = (user: AgentAttrs) => {
  const { email, password, firstName, lastName, phoneNumber, address } = user;
  if (!email || (email && !validator.isEmail(email))) {
    throw new UserInputError("invalid email");
  }
  if (!password || (password && password.trim().length < 6)) {
    throw new UserInputError("password must be six charachers min");
  }
  if (!firstName || (firstName && firstName.trim().length === 0)) {
    throw new UserInputError("enter a valid first name");
  }
  if (!lastName || (lastName && lastName.trim().length === 0)) {
    throw new UserInputError("enter a valid first name");
  }
  if (!address || (address && address.trim().length === 0)) {
    throw new UserInputError("enter a valid address");
  }
  if (
    !phoneNumber ||
    (phoneNumber && phoneNumber.toString().length < 8) ||
    (phoneNumber && !validator.isNumeric(phoneNumber.toString()))
  ) {
    throw new UserInputError("enter a valid phone number");
  }
};
