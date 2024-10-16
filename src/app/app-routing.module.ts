import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScoreboardComponent } from './scoreboards/scoreboard.component';

const routes: Routes = [
  { path: 'login-callback', component: LoginComponent },
  {
    path: 'reporting/scoreboard',
    title: 'Scoreboard',
    component: ScoreboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
