import {GAME_ACTION, GamesAction} from './game.action';
import {Board} from '../game/board.model';

const initialState = {
    games: [],
    player: '',
    isBoardActive: false,
    game_id: '',
    board: new Board()
};

export function gameReducer(state = initialState, action: GamesAction) {
    switch (action.type) {
        case GAME_ACTION.GET_GAMES:
            return {
                ...state,
                games: action.payload
            };
        case GAME_ACTION.ADD_GAME:
            return {
                ...state,
                games: [...state.games, action.payload]
            };
        case GAME_ACTION.SET_PLAYER:
            return {
                ...state,
                player: action.payload
            };
        case GAME_ACTION.ACTIVE_BOARD:
            return {
                ...state,
                isBoardActive: action.payload
            };
        case GAME_ACTION.SET_GAME_ID:
            return {
                ...state,
                game_id: action.payload
            };
        case GAME_ACTION.SET_BOARD:
            return {
                ...state,
                board: action.payload
            };
        case GAME_ACTION.CLEAR_BOARD:
            return {
                ...state,
                board: new Board()
            };
        default:
            return state;
    }
}

