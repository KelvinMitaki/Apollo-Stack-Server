import { Request } from "express";

const users = [
  {
    _id: Math.round(Math.random() * 100000000).toString(),
    fullName: "Kate Chopin",
    email: "kate@gmail.com",
    password: "kevinmitaki"
  },
  {
    _id: Math.round(Math.random() * 100000000).toString(),
    fullName: "Paul Auster",
    email: "paul@gmail.com",
    password: "kevinmitaki"
  }
];

export interface Context {
  req: Request;
}

export const resolvers = {
  Query: {
    users(prt: any, args: any, ctx: Context) {
      return users;
    }
  },
  Mutation: {
    registerUser(prt: any, args: any, ctx: Context) {}
  }
};
