import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';
import {AppMaterialModule} from './app-material.module';
import {LoginPassModalComponent} from './login/login-pass-modal/login-pass-modal.component';
import {JoinGameComponent} from './login/join-game/join-game.component';
import {CreateGameComponent} from './login/create-game/create-game.component';
import {gameReducer} from './redux/game.reducer';
import {settingsReducer} from './redux/settings.reducer';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        GameComponent,
        LoginPassModalComponent,
        JoinGameComponent,
        CreateGameComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppMaterialModule,
        StoreModule.forRoot({gameState: gameReducer, settingsState: settingsReducer})
    ],
    providers: [],
    entryComponents: [
        LoginPassModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
