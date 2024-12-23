import express from 'express';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const defaultRoutes = [
      {
        path: '/user',
        route: userRoutes,
      },
      {
        path: '/auth',
        route: authRoutes,
      },
    ]
    
    defaultRoutes.forEach((route) => {
      this.router.use(route.path, route.route);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new Router().getRouter();
