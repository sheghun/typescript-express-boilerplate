import express, {NextFunction, Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import httpStatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import Logger from './services/Logger';
import {filePath} from './utils';

const logger = new Logger(filePath(__filename));
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

// Add APIs
app.use('', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.err(err);
	return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
		error: err.message,
	});
});

// Export express instance
export default app;
