import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo, Mongoose } from "mongoose";
import logger from "morgan";
import cors from "cors";

import routes from "./routes";

const defaultPort = process.env.PORT || "3333";
const defaultMongoURI = process.env.MONGODB_URI;

class Application {
  port?: string;
  mongoURI?: string;
  connection?: mongoose.Connection;

  constructor(port: string, mongoURI: string) {
    this.port = port || defaultPort;
    if (!mongoURI && !defaultMongoURI) {
      throw new Error("The mongo URI is not provided!");
    }
    this.mongoURI = mongoURI || defaultMongoURI;
  }

  async start() {
    try {
      await mongoose.connect(this.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true
      });
      this.connection = mongoose.connection;

      const app = express();
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(cors());
      app.use(bodyParser.json());
      app.use(
        // We don't want to log stuff on CI or while testing locally
        process.env.NODE_ENV === "test"
          ? (req, res, next) => next()
          : logger("dev")
      );

      app.use("/", routes);

      app.use(errorHandler);

      this.server = app.listen(this.port);

      app.listen(3333, async () => {
        console.log("Server ready!");
        console.log("Database ready!");
        console.log(`Listening on port ${this.port}`);
      });
      this.app = app;

      return this;
    } catch (err) {
      console.error("Database connection error\n" + err);
    }
  }

  stop() {
    this.server.close();
  }
}

module.exports = Application;
