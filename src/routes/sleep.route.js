import express from 'express';
import authControllers from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import userValidationSchema from '../validations/user.validation.js';
import SleepController from '../controllers/sleep.controller.js'; // Import SleepController

class Sleep {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/alarm', authControllers.alarm);
    this.router.post('/sleep', SleepController.createSleepLog); // Add route for creating sleep log
  }

  getRouter() {
    return this.router;
  }
}

export default new Sleep().getRouter();