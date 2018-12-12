import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Store, select} from '@ngrx/store';

import {LoginPassModalComponent} from '../login-pass-modal/login-pass-modal.component';
import {IGameData} from '../login.interfaces';
import {LoginService} from '../login.service';
import {AppState} from '../../redux/app.state';

@Component({
    selector: 'app-join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

    searchControl = new FormControl();
    filteredItems: Observable<IGameData[]>;

    constructor(public dialog: MatDialog, private loginService: LoginService, private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.pipe(select((state: any) => state.gameState.games))
            .subscribe((games) => {
                this.filteredItems = this.searchControl.valueChanges.pipe(
                    startWith(''),
                    map(value => this._filter(value, games))
                );
            });
        this.loginService.get_games();
    }

    _filter(value: string, games: IGameData[]): IGameData[] {
        const filterValue = value.toLowerCase();
        return games.filter((game: IGameData) => game.name.toLowerCase().indexOf(filterValue) !== -1);
    }

    openPassModal(game: IGameData): void {
        const dialogRef = this.dialog.open(LoginPassModalComponent, {data: game});
    }
}
