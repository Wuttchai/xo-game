import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameService } from './services/game.service';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ScoreboardComponent } from './scoreboards/scoreboard.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OAuthModule } from 'angular-oauth2-oidc';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LoginComponent,
    ScoreboardComponent,
    UserDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    OAuthModule.forRoot(),
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
