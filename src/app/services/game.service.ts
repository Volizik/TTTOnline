import {Injectable, OnDestroy} from '@angular/core';

import {WebsocketService} from './websocket.service';
import {Action, Event} from '../shared.enums';
import {select, Store} from '@ngrx/store';
import {AppState} from '../redux/app.state';
import {ActiveBoard, SetBoard} from '../redux/game.action';
import {Board, ServerBoardResponse} from '../game/board.model';

@Injectable({
    providedIn: 'root'
})
export class GameService implements OnDestroy {

    private isBoardActive: boolean;

    constructor(private wsService: WebsocketService, private store: Store<AppState>) {
        this.store.pipe(select((state: any) => state.gameState))
            .subscribe((gameState) => {
                this.isBoardActive = gameState.isBoardActive;
            });
    }

    private initIoConnection(): void {
        this.wsService.connect();

        this.wsService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('Socket connected!');
            });

        this.wsService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });

        this.wsService.onEvent(Event.OPPONENT_JOINED)
            .subscribe(() => {
                console.log('opponent joined');
                this.store.dispatch(new ActiveBoard(true));
            });

        this.wsService.onEvent(Event.STEP_MADE)
            .subscribe(({board, winner}) => {
                if (winner) {
                    alert(`Winner is ${winner}`);
                    // TODO add modal
                    // TODO emmit end game
                }
                console.log('Opponent made step!');
                this.store.dispatch(new ActiveBoard(!this.isBoardActive));
                this.store.dispatch(new SetBoard(board));
                console.log('from game service', board);
            });

        this.wsService.onEvent(Event.OPPONENT_DISCONNECTED)
            .subscribe(() => {
                console.log('Game over! Opponent disconnected!');
                // TODO emmit end game
            });
    }

    public createGame(): void {
        this.initIoConnection();
        this.wsService.emitEvent(Action.CREATE_GAME);
    }

    public joinGame(): void {
        this.initIoConnection();
        this.wsService.emitEvent(Action.JOIN_GAME);
    }

    public makeStep(board: Board): void {
        this.wsService.emitEvent(Action.MAKE_STEP, board);
        this.store.dispatch(new ActiveBoard(false));
    }

    ngOnDestroy(): void {
        // TODO: unsubscribe all subscriptions
    }
}
