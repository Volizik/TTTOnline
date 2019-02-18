import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {GameService} from '../services/game.service';
import {AppState} from '../redux/app.state';
import {Board} from './board.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    public board: Board;
    private playerMark: string;
    public isBoardActive: boolean;
    private gameId: string;

    constructor(private gameService: GameService,
                private store: Store<AppState>,
                private router: Router) {
        this.store.pipe(select((state: any) => state.gameState))
            .subscribe((gameState) => {
                this.playerMark = gameState.player;
                this.isBoardActive = gameState.isBoardActive;
                this.gameId = gameState.game_id;
                this.board = gameState.board;
            });
    }

    ngOnInit() {
        if (this.gameId === '') {
            this.router.navigate(['/']);
        }
    }

    makeStep(i: number): void {
        this.board[`cell${i + 1}`] = this.playerMark;
        this.gameService.makeStep(this.board);
    }

}
