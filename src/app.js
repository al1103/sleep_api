import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import passport from 'passport';
import { errorLoggerHandler, successLoggerHandler } from './config/morgan.js';
import jwtStrategy from './config/passport.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import routes from './routes/index.js';
import ApiError from './utils/ApiError.js';

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializePassport();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    this.app.use(errorLoggerHandler);
    this.app.use(successLoggerHandler);
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.options('*', cors());
  }

  initializePassport() {
    this.app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
  }

  initializeRoutes() {
    this.app.use('/v1', routes);
    this.app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });
  }

  initializeErrorHandling() {
    this.app.use(errorConverter);
    this.app.use(errorHandler);
  }

  getInstance() {
    return this.app;
  }
}

export default new App().getInstance();
