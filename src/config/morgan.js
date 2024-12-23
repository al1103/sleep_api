import morgan from 'morgan';
import envVars from './envConfig.js';
import logger from './logger.js';

morgan.token('message', (req, res) => res.locals.errorMessage || '');
morgan.token('body', (req) => JSON.stringify(req.body) || '');

const getIpFormat = () => (envVars.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message - body: :body`;

const successLoggerHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorLoggerHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export { errorLoggerHandler, successLoggerHandler };
