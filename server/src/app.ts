import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as socketIo from 'socket.io';
import * as http from 'http';

import {Routes} from './routes';
import {AppSocket} from './services/ws';

class App {

    private readonly app: express.Application;
    private route: Routes = new Routes();
    private mongoUrl = 'mongodb://volizik:123edsaqw@ds129904.mlab.com:29904/ttt_online';
    private readonly io: socketIo.Server;
    private readonly http: http.Server;

    constructor(private NODE_ENV: string = 'production', private PORT: string = '2368') {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = socketIo(this.http);
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
        this.httpListen();
        this.socketListen();
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json({type: 'application/vnd.api+json'}));
        this.app.use(cors());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});
    }

    private socketListen(): void {
        const appSocket = new AppSocket(this.io);
    }

    private httpListen(): void {
        this.http.listen(this.PORT, () => {
            console.log(`The server is running in port: ${this.PORT}, in ${this.NODE_ENV} mode`);
        });
    }

}

export default App;
