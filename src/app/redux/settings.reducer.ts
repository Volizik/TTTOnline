import {SettingsAction, SETTINGS_ACTION} from './settings.action';

const initialState = {
    selectedTabIndex: 0
};

export function settingsReducer(state = initialState, action: SettingsAction) {
    switch (action.type) {
        case SETTINGS_ACTION.SET_TAB_INDEX:
            return {
                ...state,
                selectedTabIndex: action.payload
            };
        default:
            return state;
    }
}

