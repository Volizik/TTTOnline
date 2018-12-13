import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {select, Store} from '@ngrx/store';

import {LoginService} from './login.service';
import {AppState} from '../redux/app.state';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    selectedIndex = 0;
    $storeSubscription: Subscription;

    constructor(private loginService: LoginService, private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.$storeSubscription = this.store.pipe(select((state: any) => state.settingsState.selectedTabIndex))
            .subscribe((tabIndex: number) => {
                this.selectedIndex = tabIndex;
            });
    }

    selectTab(event: MatTabChangeEvent): void {
        this.loginService.setTabIndex(event.index);
    }

    ngOnDestroy(): void {
        this.$storeSubscription.unsubscribe();
    }

}
