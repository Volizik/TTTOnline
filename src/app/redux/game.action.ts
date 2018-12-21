import {Action} from '@ngrx/store';
import {IGameData} from '../login/login.interfaces';
import {ServerBoardResponse} from '../game/board.model';

export namespace GAME_ACTION {
    export const GET_GAMES = 'GET_GAMES';
    export const ADD_GAME = 'ADD_GAME';
    export const SET_PLAYER = 'SET_PLAYER';
    export const ACTIVE_BOARD = 'ACTIVE_BOARD';
    export const SET_GAME_ID = 'SET_GAME_ID';
    export const SET_BOARD = 'SET_GAME_ID';
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

export class ActiveBoard implements Action {
    readonly type = GAME_ACTION.ACTIVE_BOARD;
    constructor(public payload: boolean) {}
}

export class SetGameId implements Action {
    readonly type = GAME_ACTION.SET_GAME_ID;
    constructor(public payload: string) {}
}

export class SetBoard implements Action {
    readonly type = GAME_ACTION.SET_BOARD;
    constructor(public payload: ServerBoardResponse) {}
}

export type GamesAction = GetGames | AddGame | SetPlayerMark | ActiveBoard | SetGameId | SetBoard;
