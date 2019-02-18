"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ttt_logic_1 = require("../helpers/ttt.logic");
var AppSocket = /** @class */ (function () {
    function AppSocket(io) {
        this.io = io;
        this.result = new ttt_logic_1.TttLogic();
        this.listen();
    }
    AppSocket.prototype.listen = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log('query ', socket.handshake['query']);
            console.log("Socket " + socket.id + " is connected!");
            _this.initSocketEventListeners(socket);
            socket.on('disconnect', function () {
                var game_id = socket.handshake['query']['game_id'];
                socket.broadcast.to(game_id).emit('opponent_disconnected');
                socket.leave(game_id);
                console.log("Socket " + socket.id + " disconnected!");
            });
        });
    };
    AppSocket.prototype.initSocketEventListeners = function (socket) {
        var _this = this;
        socket.on('create_game', function () {
            var game_id = socket.handshake['query']['game_id'];
            socket.join(game_id);
        });
        socket.on('join_game', function () {
            var game_id = socket.handshake['query']['game_id'];
            socket.join(game_id);
            socket.broadcast.to(game_id).emit('opponent_joined');
        });
        socket.on('make_step', function (board) {
            var game_id = socket.handshake['query']['game_id'];
            var result = _this.result.checkIfWin(board);
            if (result.winner) {
                _this.io.in(game_id).emit('winner', result.winner);
            }
            else {
                socket.broadcast.to(game_id).emit('step_made', result);
            }
        });
    };
    return AppSocket;
}());
exports.AppSocket = AppSocket;
//# sourceMappingURL=ws.js.map