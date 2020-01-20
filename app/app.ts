// app/app.ts
import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import mongoose from 'mongoose';
import errorMiddleware from './errors/error.middleware';

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public port = process.env.PORT || 3000;
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
        this.listen()
        this.initializeErrorHandling()
    }
    private config(): void {

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private mongoSetup(): void {
        mongoose.connect('mongodb://localhost/ts')
            .then(() => console.log('connection successful'))
            .catch((err) => console.error(err));
    }
    public listen() {   
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
      }    

}

export default new App().app;
