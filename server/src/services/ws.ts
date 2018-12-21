import * as socketIo from 'socket.io';
import {Socket} from 'socket.io';

import {TttLogic} from '../helpers/ttt.logic';

export class AppSocket {

    private result = new TttLogic();

    constructor(private io: socketIo.Server) {
        this.listen();
    }

    private listen(): void {
        this.io.on('connection', (socket: Socket) => {

            console.log(`Socket ${socket.id} is connected!`);

            this.initSocketEventListeners(socket);

            socket.on('disconnect', () => {
                const game_id = socket.handshake['query']['game_id'];
                socket.broadcast.to(game_id).emit('opponent_disconnected');
                socket.leave(game_id);
                console.log(`Socket ${socket.id} disconnected!`);
            });

        });
    }

    private initSocketEventListeners(socket: Socket): void {
        socket.on('create_game', () => {
            const game_id = socket.handshake['query']['game_id'];
            socket.join(game_id);
        });

        socket.on('join_game', () => {
            const game_id = socket.handshake['query']['game_id'];
            socket.join(game_id);
            socket.broadcast.to(game_id).emit('opponent_joined');
        });

        socket.on('make_step', (board) => {
            const game_id = socket.handshake['query']['game_id'];
            const result = this.result.checkIfWin(board);
            socket.broadcast.to(game_id).emit('step_made', result);
        });
    }

}
