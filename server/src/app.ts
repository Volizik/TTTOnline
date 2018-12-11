import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { Routes } from './routes';

class App {

    public app: express.Application;
    private route: Routes = new Routes();
    private mongoUrl = 'mongodb://volizik:123edsaqw@ds129904.mlab.com:29904/ttt_online';

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.app.use(cors());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;
