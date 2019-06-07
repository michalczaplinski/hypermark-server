import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo, Mongoose } from "mongoose";
import logger from "morgan";
import cors from "cors";

import routes from "./routes";
import { Server } from "http";
import errorHandler from "./middlewares/errorHandler";

class Application {
  port?: string;
  mongoURI: string;
  connection?: mongoose.Connection;
  app!: Express.Application;
  server!: Server;

  constructor(port?: string, mongoURI?: string) {
    const defaultPort = process.env.PORT || "3003";
    const defaultMongoURI = process.env.MONGO_URI;

    this.port = port || defaultPort;

    if (!mongoURI && !defaultMongoURI) {
      throw new Error("The mongo URI is not provided!");
    }
    this.mongoURI = mongoURI || (defaultMongoURI as string);
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

export default Application;
