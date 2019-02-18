"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var socketIo = require("socket.io");
var http = require("http");
var routes_1 = require("./routes");
var ws_1 = require("./services/ws");
var path = require("path");
var App = /** @class */ (function () {
    function App(NODE_ENV, PORT) {
        if (NODE_ENV === void 0) { NODE_ENV = 'production'; }
        if (PORT === void 0) { PORT = '2368'; }
        this.NODE_ENV = NODE_ENV;
        this.PORT = PORT;
        this.route = new routes_1.Routes();
        this.mongoUrl = 'mongodb://volizik:123edsaqw@ds129904.mlab.com:29904/ttt_online';
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = socketIo(this.http);
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
        this.httpListen();
        this.socketListen();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.app.use(cors());
        this.app.use('/', express.static(path.resolve(__dirname, '../../dist/TTTonline')));
    };
    App.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    };
    App.prototype.socketListen = function () {
        var appSocket = new ws_1.AppSocket(this.io);
    };
    App.prototype.httpListen = function () {
        var _this = this;
        this.http.listen(this.PORT, function () {
            console.log("The server is running in port: " + _this.PORT + ", in " + _this.NODE_ENV + " mode");
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map