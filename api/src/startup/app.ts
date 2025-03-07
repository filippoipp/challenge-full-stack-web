import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import http from 'http';

import { startConnection } from '../infra/database';
import Config from '../config/app-config';
import HttpError from '../errors/http-error';
import Actuator from './actuator';
import Routes from './routes';

class App {
  public express: express.Application = null;

  private httpServer: http.Server = null;

  public constructor() {
    this.express = express();
    this.middleware();

    this.express.use('/api', Routes());
    this.express.use('/actuator', Actuator);

    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send();
    });

    this.express.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const exception = err;

        if (err instanceof HttpError) {
          const { code, report, message } = err;

          res.status(Number(err.statusCode)).json({
            code,
            message,
            report,
            exception,
          });
          return;
        }

        res.status(500).json({
          code: 'SERVER-000',
          message: 'Internal Server Error',
          exception,
        });
      },
    );
  }

  public async start(): Promise<void> {
    startConnection();
    this.httpServer = http.createServer(this.express);
    this.httpServer.listen(
      Config.SERVERS.http.port,
      Config.SERVERS.http.hostname,
      (): void => {
        console.log(`${Config.SERVERS.http.hostname} running on port ${Config.SERVERS.http.port}`);
      },
    );
  }

  public close(): void {
    if (this.httpServer !== null) {
      this.httpServer.close();
    }
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(
      (req: Request, res: Response, next: NextFunction): void => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'DELETE']);
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-uuid, authorization, totp-token',
        );
        next();
      },
    );
    this.express.use(compression());
  }
}

export default App;
