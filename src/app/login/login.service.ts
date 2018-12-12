import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGameData} from './login.interfaces';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {environment} from '../../environments/environment';
import {AppState} from '../redux/app.state';
import {AddGame, GetGames} from '../redux/game.action';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient, private store: Store<AppState>) {
    }

    public create(game: IGameData): void {
        this.http.post<IGameData>(`${environment.apiUrl}/create`, game)
            .subscribe((res: IGameData) => {
                this.store.dispatch(new AddGame(res));
            });
    }
    // public join(game: IGameData): Observable<IGameData> {
    //     return this.http.post<IGameData>(`${environment.apiUrl}/create`, game);
    // }
    public get_games(): void {
        this.http.get<IGameData[]>(`${environment.apiUrl}/get_games`)
            .subscribe((games: IGameData[]) => {
                this.store.dispatch(new GetGames(games));
            });
    }
}
