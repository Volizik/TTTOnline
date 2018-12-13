import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
    {path: '', component: LoginComponent, pathMatch: 'full'},
    {path: 'game/:id', component: GameComponent},
    {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
