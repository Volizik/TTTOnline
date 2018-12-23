import {MatDialog} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {Injectable, OnDestroy} from '@angular/core';

import {WebsocketService} from './websocket.service';
import {Action, Event} from '../shared.enums';
import {AppState} from '../redux/app.state';
import {ActiveBoard, SetBoard} from '../redux/game.action';
import {Board} from '../game/board.model';
import {EndGameModalComponent} from '../game/end-game-modal/end-game-modal.component';

@Injectable({
    providedIn: 'root'
})
export class GameService implements OnDestroy {

    private isBoardActive: boolean;

    constructor(public dialog: MatDialog,
                private wsService: WebsocketService,
                private store: Store<AppState>) {
        this.store.pipe(select((state: any) => state.gameState))
            .subscribe((gameState) => {
                this.isBoardActive = gameState.isBoardActive;
            });
    }

    private initIoConnection(game_id: string): void {
        this.wsService.connect(game_id);

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
                    this.endGame(winner);
                }
                console.log('Step made!');
                this.store.dispatch(new ActiveBoard(true));
                this.store.dispatch(new SetBoard(board));
            });

        this.wsService.onEvent(Event.OPPONENT_DISCONNECTED)
            .subscribe(() => {
                console.log('Game over! Opponent disconnected!');
                this.endGame();
            });

        this.wsService.onEvent(Event.WINNER)
            .subscribe((winner) => {
                this.endGame(winner);
            });
    }

    public createGame(game_id: string): void {
        this.initIoConnection(game_id);
        this.wsService.emitEvent(Action.CREATE_GAME);
    }

    public joinGame(game_id: string): void {
        this.initIoConnection(game_id);
        this.wsService.emitEvent(Action.JOIN_GAME);
    }

    public makeStep(board: Board): void {
        this.wsService.emitEvent(Action.MAKE_STEP, board);
        this.store.dispatch(new ActiveBoard(false));
    }

    public endGame(winner?): void {
        const dialogRef = this.dialog.open(EndGameModalComponent, {data: winner});
    }

    ngOnDestroy(): void {
        // TODO: unsubscribe all subscriptions
    }
}
