import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './src/middlewares/error';
import { ApiError } from './src/utils/ApiError';
import httpStatus from 'http-status';
import morgan from './src/config/morgan';
dotenv.config();
import connectToMongo from './db/conn';
require('./db/conn');

//Connect to database
connectToMongo();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to use req.body

app.use(morgan.successHandler);
app.use(morgan.errorHandler);


// send back a 404 error for any unknown api request
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

const _errorHandler = new ErrorHandler();

// convert error to ApiError, if needed
app.use(_errorHandler.errorConverter);

// handle error
app.use(_errorHandler.errorHandler);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});