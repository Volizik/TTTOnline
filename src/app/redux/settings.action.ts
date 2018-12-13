import {Action} from '@ngrx/store';

export namespace SETTINGS_ACTION {
    export const SET_TAB_INDEX = 'SET_TAB_INDEX';
}

export class SetTabIndex implements Action {
    readonly type = SETTINGS_ACTION.SET_TAB_INDEX;
    constructor(public payload: number) {}
}

export type SettingsAction = SetTabIndex;
