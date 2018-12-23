import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {Action} from '../../shared.enums';
import {ActiveBoard, ClearBoard} from '../../redux/game.action';
import {WebsocketService} from '../../services/websocket.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';

@Component({
    selector: 'app-end-game-modal',
    templateUrl: './end-game-modal.component.html',
    styleUrls: ['./end-game-modal.component.css']
})
export class EndGameModalComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<EndGameModalComponent>,
                private router: Router,
                private wsService: WebsocketService,
                private store: Store<AppState>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data?: string) {
    }

    ngOnInit() {
    }

    endGame() {
        this.wsService.emitEvent(Action.END_GAME);
        this.store.dispatch(new ActiveBoard(false));
        this.store.dispatch(new ClearBoard());
        this.dialogRef.close();
        this.router.navigate(['/']);
    }

}
