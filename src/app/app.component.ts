import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { ApiService } from './services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
//import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'xo-game';
  userID = '1';
  constructor(
    public gameService: GameService,
    public apiService: ApiService, // private authGoogleServiceService: AuthGoogleServiceService
    private dialog: MatDialog
  ) {
    //this.configure();
  }
  /* ngOnInit() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  configure() {
    this.oauthService.configure({
      // Replace with your OAuth provider details
      issuer: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin + '/index.html',
      clientId:
        '453277300843-mo7001dct2lpi28ao2q6ftk7c0j9tth1.apps.googleusercontent.com',
      scope: 'openid profile email',
      responseType: 'code',
      requireHttps: true, // Set to false if you're testing locally over HTTP
    });
  } 
  login() {
    this.oauthService.initImplicitFlow(); // or initCodeFlow() for Authorization Code flow
    console.log(this.oauthService.hasValidAccessToken());
  }*/
  resetGame() {
    this.gameService.newGame();
  }
  changePlayer(square: any) {
    this.gameService.isGameRunning = !this.gameService.gameOver;

    if (this.gameService.isGameRunning && square.state === null) {
      square.state = this.gameService.activePlayer;
      this.gameService.changePlayerTurn(square);
      if (!this.gameService.gameOver) {
        this.botPlayer();
      }

      if (this.gameService.gameOver) {
        let point = 0;
        if (this.gameService.activePlayer == 'X') {
          point = 1;
        }
        this.apiService.getPointByUser('1').subscribe((data: any) => {
          let pointSum: number = data
            .map((a: { point: any }) => a.point)
            .reduce(function (a: any, b: any) {
              return a + b;
            });
          this.sendData(point);
          if (pointSum + point == 3) {
            this.sendData(point);
            this.sendData(0);
          }
        });
      }
    }
  }
  sendData(point: number) {
    const data = {
      userID: this.userID,
      point: point,
    };

    this.apiService.saveWinner(data).subscribe(
      (response) => {
        console.log('Data submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting data:', error);
      }
    );
  }

  botPlayer() {
    const getBoard = this.gameService.getBoard.filter(
      (board) => board.state === null
    );
    console.log(getBoard);
    const random = Math.floor(Math.random() * getBoard.length);

    var rand = getBoard[(Math.random() * getBoard.length) | 0];

    const botSquare = {
      id: rand.id,
      state: 'O',
    };
    this.gameService.changePlayerTurn(botSquare);
  }
  openDialog() {
    this.dialog.open(UserDialogComponent, {
      height: '400px',
      width: '600px',
      data: { title: 'Scoreboard', showScoreboard: true }, // Pass your input value here
    });
  }
}
