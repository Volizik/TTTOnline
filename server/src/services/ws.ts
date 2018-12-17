import * as socketIo from 'socket.io';
import {Socket} from 'socket.io';

import {IBoard} from '../interfaces/iBoard';
import {TttLogic} from '../helpers/ttt.logic';
import {IGameWinner} from '../interfaces/iGame';

export class AppSocket {

    private result = new TttLogic();

    constructor(private io: socketIo.Server) {
        this.listen();
    }

    private listen(): void {
        this.io.on('connection', (socket: Socket) => {

            console.log(`Socket ${socket.id} is connected!`);

            this.initSocketActions(socket);
            this.initSocketEventListeners(socket);

            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected!`);
            });

        });
    }

    private initSocketActions(socket: Socket): void {

    }

    private initSocketEventListeners(socket: Socket): void {
        socket.on('joinGame', (game_id: string) => {
            socket.join(game_id);
        });

        socket.on('makeStep', (board: IBoard, game_id) => {
            const result = this.makeStep(board);
            socket.to(game_id).emit('stepMade', result);
        });

        socket.on('message', () => {
            socket.emit('Hello!');
        });
    }

    private makeStep(board: IBoard): IGameWinner {
        const result = this.result.checkIfWin(board);
        console.log(result)
        if (result === '') {
            return {status: 'OK'};
        } else if (result === 'x') {
            return {status: 'OK', winner: 'x'};
        } else {
            return {status: 'OK', winner: 'o'};
        }
    }

}
