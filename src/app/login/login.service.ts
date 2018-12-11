import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IGameData} from './login.interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    public create(game: IGameData): Observable<IGameData> {
        return this.http.post<IGameData>(`${environment.apiUrl}/create`, game);
    }
    // public join(game: IGameData): Observable<IGameData> {
    //     return this.http.post<IGameData>(`${environment.apiUrl}/create`, game);
    // }
    public get_games(): Observable<IGameData[]> {
        return this.http.get<IGameData[]>(`${environment.apiUrl}/get_games`);
    }
}
