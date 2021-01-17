import { UserAttrs } from "../models/User";
import validator from "validator";
import { UserInputError } from "apollo-server-express";
import { AgentAttrs } from "../models/Agent";
import { PropertyAttrs } from "../models/Property";

export const RegisterUserValidation = (args: UserAttrs) => {
  const { email, password, firstName, lastName } = args;
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
export const RegisterAgentValidation = (args: AgentAttrs) => {
  const { email, password, firstName, lastName, phoneNumber, address } = args;
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

export const AddPropertyValidation = (args: PropertyAttrs) => {
  const {
    reference,
    location,
    streetAddress,
    category,
    price,
    bedrooms,
    bathrooms,
    type,
    status,
    heading,
    description,
    expiryDate,
    images
  } = args;
  if (!reference || (reference && !validator.isNumeric(reference.toString()))) {
    throw new UserInputError("Enter a valid reference number");
  }
  if (!location || (location && location.trim().length === 0)) {
    throw new UserInputError("Enter a valid location");
  }
  if (!streetAddress || (streetAddress && streetAddress.trim().length === 0)) {
    throw new UserInputError("Enter a valid street address");
  }
  if (!category || (category && category.trim().length === 0)) {
    throw new UserInputError("Enter a valid category");
  }
  if (!price || (price && !validator.isNumeric(price.toString()))) {
    throw new UserInputError("Enter a valid price");
  }
  if (!bedrooms || (bedrooms && !validator.isNumeric(bedrooms.toString()))) {
    throw new UserInputError("Enter a valid bedroom number");
  }
  if (!bathrooms || (bathrooms && !validator.isNumeric(bathrooms.toString()))) {
    throw new UserInputError("Enter a valid bathroom number");
  }
  if (!type || (type && type.trim().length === 0)) {
    throw new UserInputError("Enter a valid type");
  }
  if (!status || (status && status.trim().length === 0)) {
    throw new UserInputError("Enter a valid status");
  }
  if (!heading || (heading && heading.trim().length === 0)) {
    throw new UserInputError("Enter a valid heading");
  }
  if (!description || (description && description.trim().length < 20)) {
    throw new UserInputError("description must be 20 characters min");
  }
  if (
    !expiryDate ||
    // @ts-ignore
    (expiryDate && new Date(expiryDate) == "Invalid Date") ||
    // @ts-ignore
    isNaN(new Date(expiryDate))
  ) {
    throw new UserInputError("Enter a valid date");
  }
  if (!images || (images && images.length === 0)) {
    throw new UserInputError("Enter valid images");
  }
};
export const EditPropertyValidation = (args: PropertyAttrs) => {
  const {
    reference,
    location,
    streetAddress,
    category,
    price,
    bedrooms,
    bathrooms,
    type,
    status,
    heading,
    description,
    expiryDate,
    images
  } = args;
  if (reference && !validator.isNumeric(reference.toString())) {
    throw new UserInputError("Enter a valid reference number");
  }
  if (location && location.trim().length === 0) {
    throw new UserInputError("Enter a valid location");
  }
  if (streetAddress && streetAddress.trim().length === 0) {
    throw new UserInputError("Enter a valid street address");
  }
  if (category && category.trim().length === 0) {
    throw new UserInputError("Enter a valid category");
  }
  if (price && !validator.isNumeric(price.toString())) {
    throw new UserInputError("Enter a valid price");
  }
  if (bedrooms && !validator.isNumeric(bedrooms.toString())) {
    throw new UserInputError("Enter a valid bedroom number");
  }
  if (bathrooms && !validator.isNumeric(bathrooms.toString())) {
    throw new UserInputError("Enter a valid bathroom number");
  }
  if (type && type.trim().length === 0) {
    throw new UserInputError("Enter a valid type");
  }
  if (status && status.trim().length === 0) {
    throw new UserInputError("Enter a valid status");
  }
  if (heading && heading.trim().length === 0) {
    throw new UserInputError("Enter a valid heading");
  }
  if (description && description.trim().length < 20) {
    throw new UserInputError("description must be 20 characters min");
  }
  if (
    // @ts-ignore
    (expiryDate && new Date(expiryDate) == "Invalid Date") ||
    // @ts-ignore
    (expiryDate && isNaN(new Date(expiryDate)))
  ) {
    throw new UserInputError("Enter a valid date");
  }
  if (images && images.length === 0) {
    throw new UserInputError("Enter valid images");
  }
};

export const EditProfileValidation = (args: AgentAttrs, isAgent: boolean) => {
  const { email, firstName, lastName, phoneNumber } = args;
  if (!email || (email && !validator.isEmail(email))) {
    throw new UserInputError("invalid email");
  }
  if (!firstName || (firstName && firstName.trim().length === 0)) {
    throw new UserInputError("enter a valid first name");
  }
  if (!lastName || (lastName && lastName.trim().length === 0)) {
    throw new UserInputError("enter a valid first name");
  }
  if (
    (isAgent && !phoneNumber) ||
    (phoneNumber && phoneNumber.toString().trim().length < 8) ||
    (phoneNumber && !validator.isNumeric(phoneNumber.toString()))
  ) {
    throw new UserInputError("enter a valid phone number");
  }
};
