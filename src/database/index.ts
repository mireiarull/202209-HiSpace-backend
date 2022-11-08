import "../loadEnvirontment.js";
import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";
import environment from "../loadEnvirontment.js";

const debug = debugCreator("robots: database");

const connectDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    debug(chalk.green("Connection to database was successfull"));

    mongoose.set("debug", environment.mongoDbDebug === "true");
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ret;
      },
    });
  } catch (error: unknown) {
    debug("Error on connecting to database", (error as Error).message);
  }
};

export default connectDatabase;
