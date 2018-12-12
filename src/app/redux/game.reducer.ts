import {GAME_ACTION, GamesAction} from './game.action';

const initialState = {
    games: []
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
        default:
            return state;
    }
}

