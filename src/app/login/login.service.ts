import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {IGameData} from './login.interfaces';
import {environment} from '../../environments/environment';
import {AppState} from '../redux/app.state';
import {AddGame, GetGames, SetPlayerMark, SetGameId} from '../redux/game.action';
import {ITttServerResponseData} from '../shared.interfaces';
import {SetTabIndex} from '../redux/settings.action';
import {GameService} from '../services/game.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient,
                private store: Store<AppState>,
                private router: Router,
                private gameService: GameService) {
    }

    public create(game: IGameData): void {
        this.http.post<ITttServerResponseData>(`${environment.apiUrl}/create`, game)
            .subscribe((res: ITttServerResponseData) => {
                if (res.error) {
                    console.error(res.error);
                }
                if (res.status === 'OK') {
                    this.store.dispatch(new AddGame(res.gameObj));
                    this.store.dispatch(new SetPlayerMark('x'));
                    this.store.dispatch(new SetGameId(res.gameObj._id));
                    this.router.navigate(['/game', res.gameObj._id]).then(() => {
                        this.gameService.createGame();
                    });
                }
            });
    }

    public join({id, password}): void {
        this.http.post<ITttServerResponseData>(`${environment.apiUrl}/join`, {id, password})
            .subscribe((res: ITttServerResponseData) => {
                if (res.error) {
                    console.error(res.error);
                }
                if (res.status === 'OK') {
                    this.store.dispatch(new SetPlayerMark('o'));
                    this.store.dispatch(new SetGameId(res.gameObj._id));
                    this.router.navigate(['/game', res.gameObj._id]).then(() => {
                        this.gameService.joinGame();
                    });
                }
            });
    }

    public get_games(): void {
        this.http.get<ITttServerResponseData>(`${environment.apiUrl}/get_games`)
            .subscribe((res: ITttServerResponseData) => {
                if (res.error) {
                    console.error(res.error);
                }
                if (res.status === 'OK') {
                    this.store.dispatch(new GetGames(res.gameArr));
                }
            });
    }

    public setTabIndex(num: number): void {
        this.store.dispatch(new SetTabIndex(num));
    }
}
