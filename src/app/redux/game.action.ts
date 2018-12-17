import {Action} from '@ngrx/store';
import {IGameData} from '../login/login.interfaces';

export namespace GAME_ACTION {
    export const GET_GAMES = 'GET_GAMES';
    export const ADD_GAME = 'ADD_GAME';
    export const SET_PLAYER = 'SET_PLAYER';
}

export class GetGames implements Action {
    readonly type = GAME_ACTION.GET_GAMES;
    constructor(public payload: IGameData[]) {}
}

export class AddGame implements Action {
    readonly type = GAME_ACTION.ADD_GAME;
    constructor(public payload: IGameData) {}
}

export class SetPlayerMark implements Action {
    readonly type = GAME_ACTION.SET_PLAYER;
    constructor(public payload: string) {}
}

export type GamesAction = GetGames | AddGame | SetPlayerMark;
