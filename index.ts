import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/typeDefs";
import mongoose from "mongoose";
import { User } from "./models/User";
import { Agent } from "./models/Agent";

const app = express();
app.set("trust proxy", "1");

// app.use(
//   cors({
//     credentials: true,
//     origin:
//       process.env.NODE_ENV !== "production"
//         ? "http://localhost:3001"
//         : "https://apollo-stack-51stit47a.vercel.app"
//   })
// );

app.use(
  cookieSession({
    secret: process.env.JWT_SECRET,
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    return {
      req,
      User,
      Agent,
      res
    };
  }
});

if (!process.env.MONGO_URI) {
  throw new Error("Uri must be provided");
}

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
};
MongooseConnect();

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001"
        : "https://apollo-stack-51stit47a.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`server started at http://localhost:4000${server.graphqlPath}`);
});
