import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

import {environment} from '../../environments/environment';
import {Action, Event} from '../shared.enums';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private socket;

    constructor() {
    }

    public connect(): void {
        this.socket = io.connect(environment.wsUrl);
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, (data) => observer.next(data));
        });
    }

    public emitEvent(action: Action, data?: any): void {
        this.socket.emit(action, data);
    }
}
