import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './src/middlewares/error';
import { ApiError } from './src/utils/ApiError';
import httpStatus from 'http-status';
import morgan from './src/config/morgan';
dotenv.config();
import connectToMongo from './db/conn';
require('./db/conn');
import routes from './src/routes'
import multer from "multer";
import * as fs from "fs";
import { importExcelData2DB } from './src/utils/helper';

//Connect to database
connectToMongo();
const port = process.env.PORT || 8000;

const app = express();
app.use(express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to use req.body

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: multerStorage });

// upload data from excel
app.post("/uploadData", upload.single("file"), async (req, res) => {
    fs.access("./uploads", async (error) => {
        if (error) {
            fs.mkdirSync("./uploads");
        }
    });
    importExcelData2DB(__dirname + '/uploads/' + req.file.originalname);
    return res.json({ 'msg': 'File Uploaded Successfully' });
});

// available routes
app.use('/', routes);

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