export enum Action {
    MAKE_STEP = 'make_step',
    CREATE_GAME = 'create_game',
    JOIN_GAME = 'join_game',
    END_GAME = 'end_game',
}

export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    OPPONENT_JOINED = 'opponent_joined',
    STEP_MADE = 'step_made',
    OPPONENT_DISCONNECTED = 'opponent_disconnected',
    WINNER = 'winner',
}
