"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
class Application {
    constructor(port, mongoURI) {
        const defaultPort = process.env.PORT || "3003";
        const defaultMongoURI = process.env.MONGO_URI;
        this.port = port || defaultPort;
        if (!mongoURI && !defaultMongoURI) {
            throw new Error("The mongo URI is not provided!");
        }
        this.mongoURI = mongoURI || defaultMongoURI;
    }
    async start() {
        try {
            await mongoose_1.default.connect(this.mongoURI, {
                useNewUrlParser: true,
                useCreateIndex: true
            });
            this.connection = mongoose_1.default.connection;
            const app = express_1.default();
            app.use(body_parser_1.default.urlencoded({
                extended: true
            }));
            app.use(cors_1.default());
            app.use(body_parser_1.default.json());
            app.use(
            // We don't want to log stuff on CI or while testing locally
            process.env.NODE_ENV === "test"
                ? (req, res, next) => next()
                : morgan_1.default("dev"));
            app.use("/", routes_1.default);
            // app.use(errorHandler);
            this.server = app.listen(this.port);
            app.listen(3333, async () => {
                console.log(`Listening on port ${this.port}`);
            });
            this.app = app;
            return this;
        }
        catch (err) {
            console.error("Database connection error\n" + err);
        }
    }
    stop() {
        this.server.close();
    }
}
exports.default = Application;
