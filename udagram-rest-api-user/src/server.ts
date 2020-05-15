import express from "express";
import { sequelize } from "./sequelize";
import { IndexRouter } from "./controllers/v1/index.router";
import bodyParser from "body-parser";
import { config } from "./config";
import { V1_MODELS } from "./controllers/v1/model.index";

class Program {
  static async main(_args: string[]): Promise<void> {
    sequelize.addModels(V1_MODELS);
    await sequelize.sync();

    const app = express();
    const port = process.env.PORT || 8080; // default port to listen

    app.use(bodyParser.json());

    //CORS Should be restricted
    app.use(function (_req, res, next) {
      res.header("Access-Control-Allow-Origin", config.url);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });

    app.use("/api/v1/", IndexRouter);

    // Root URI call
    app.get("/", async (_req, res) => {
      res.send("/api/v1/");
    });

    // Start the Server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("Press CTRL+C to stop server");
    });
  }
}

Program.main(process.argv);
