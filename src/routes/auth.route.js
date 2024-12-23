import express from 'express';
import authControllers from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import authValidationSchema from '../validations/auth.validation.js';
import userValidationSchema from '../validations/user.validation.js';

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', validate(userValidationSchema.CreateUserSchema), authControllers.register);
    this.router.post('/login', validate(authValidationSchema.LoginSchema), authControllers.login);
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRouter().getRouter();
