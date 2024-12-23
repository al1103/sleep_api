import express from 'express';
import { ROLE_RIGHT_KEYS } from '../config/roles.js';
import userControllers from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import userValidationSchema from '../validations/user.validation.js';

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.route('/').get(auth(ROLE_RIGHT_KEYS.GET_USERS), validate(userValidationSchema.GetUsersSchema), userControllers.getUsers);
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRouter().getRouter();
