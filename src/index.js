import app from './app.js';
import logger from './config/logger.js';
import sequelize from './config/sequelize.js';
import appModels from './models/index.js';

class Server {
  constructor(port = 3000, maxRetries = 5, retryDelay = 5000) {
    this.port = port;
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
    this.server = null;
    this.retries = 0;
  }

  async start() {
    while (this.retries < this.maxRetries) {
      try {
        await sequelize.authenticate();
        logger.info('Connected to database');

        await appModels.syncModels();

        this.server = app.listen(this.port, () => {
          logger.info(`Listening on port ${this.port}`);
        });

        this.setupProcessHandlers();
        return;
      } catch (error) {
        this.retries++;
        logger.error(`Failed to connect to the database, attempt ${this.retries}/${this.maxRetries}`, error);

        if (this.retries < this.maxRetries) {
          logger.info(`Retrying in ${this.retryDelay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
        } else {
          logger.error('Max retries reached, exiting application');
          process.exit(1);
        }
      }
    }
  }

  setupProcessHandlers() {
    process.on('uncaughtException', this.unexpectedErrorHandler.bind(this));
    process.on('unhandledRejection', this.unexpectedErrorHandler.bind(this));
    process.on('SIGTERM', this.shutdown.bind(this));
  }

  shutdown() {
    logger.info('SIGTERM received');
    if (this.server) {
      this.server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }

  unexpectedErrorHandler(error) {
    logger.error(error);
    this.shutdown();
  }
}

const server = new Server();
server.start();
