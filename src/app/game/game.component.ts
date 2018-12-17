import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {GameService} from '../services/game.service';
import {AppState} from '../redux/app.state';
import {Board} from './board.model';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    private board = new Board();
    private anotherPlayer = true;
    private playerMark: string;

    constructor(private gameService: GameService,
                private store: Store<AppState>) {
        this.store.pipe(select((state: any) => state.gameState.player))
            .subscribe((playerMark) => {
               this.playerMark = playerMark;
            });
    }

    ngOnInit() {
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    makeStep(i: number): void {
        this.board[`cell${i + 1}`] = this.playerMark;
        console.log(this.board);
    }

}
