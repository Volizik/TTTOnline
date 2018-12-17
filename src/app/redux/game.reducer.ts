import {GAME_ACTION, GamesAction} from './game.action';

const initialState = {
    games: [],
    player: ''
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
        default:
            return state;
    }
}

