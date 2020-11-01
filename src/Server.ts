import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, {NextFunction, Request, Response} from 'express';
import httpStatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import Logger from './services/Logger';
import * as mongoose from 'mongoose';

const app = express();

// Connect to database
(async () => {
    try {
        const options: mongoose.ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            useFindAndModify: false,
        };

        await mongoose.connect(process.env.DB_URL as string, options);
    } catch (error) {
        Logger.err(error, true);
        throw error;
    }
})();

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
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.err(err, true);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: err.message,
    });
});

// Export express instance
export default app;
