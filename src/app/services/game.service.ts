import {Injectable, OnDestroy} from '@angular/core';

import {WebsocketService} from './websocket.service';
import {Action, Event} from '../shared.enums';

@Injectable({
    providedIn: 'root'
})
export class GameService implements OnDestroy {

    constructor(private wsService: WebsocketService) {
        this.initIoConnection();
    }

    private initIoConnection(): void {
        this.wsService.connect();

        this.wsService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.wsService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });

        this.wsService.onEvent(Event.USER2_JOINED)
            .subscribe(() => {
                console.log('user 2 joined');
            });
    }

    public makeStep(data: any): void {
        this.wsService.emitEvent(Action.MAKE_STEP, data);
    }

    ngOnDestroy(): void {
        // TODO: unsubscribe all subscriptions
    }
}
