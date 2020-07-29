import express, { NextFunction, Response, Request } from 'express';
import { sequelize } from './sequelize';
import { IndexRouter } from './controllers/v0/index.router';
import bodyParser from 'body-parser';
import { config } from './config';
import { V0MODELS } from './controllers/v0/model.index';

class Server {
  static restrictCORS(c: typeof config.dev) {
    return (req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', c.url);
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      next();
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async main(args: string[]) {
    const c = config.dev;
    await sequelize.addModels(V0MODELS);
    await sequelize.sync();

    const app = express();
    const port = process.env.PORT || 8080; // default port to listen

    app.use(bodyParser.json());

    //CORS Should be restricted
    app.use(Server.restrictCORS(c));

    app.use('/api/v0/', IndexRouter);

    // Root URI call
    app.get('/', async (req, res) => {
      res.send('/api/v0/');
    });

    // Start the Server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log('Press CTRL+C to stop the server');
    });
  }
}

Server.main(process.argv);
