import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {LoginPassModalComponent} from '../login-pass-modal/login-pass-modal.component';
import {IGameData} from '../login.interfaces';
import {LoginService} from '../login.service';

@Component({
    selector: 'app-join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

    searchControl = new FormControl();
    filteredItems: Observable<IGameData[]>;
    gamesArr: IGameData[] = [];

    constructor(public dialog: MatDialog, private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginService.get_games()
            .subscribe((games: IGameData[]) => {
                this.gamesArr = games;
            });

        this.filteredItems = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    _filter(value): IGameData[] {
        const filterValue = value.toLowerCase();
        return this.gamesArr.filter((game: IGameData) => game.name.toLowerCase().indexOf(filterValue) !== -1);
    }

    openPassModal(game: IGameData): void {
        const dialogRef = this.dialog.open(LoginPassModalComponent, {data: game});
    }
}
