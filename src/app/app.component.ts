import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { ApiService } from './services/api.service';
import { GetScoreboard } from './services/interfaces/get-scoreboard.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'xo-game';
  constructor(
    public gameService: GameService,
    public apiService: ApiService, // private authGoogleServiceService: AuthGoogleServiceService
    private dialog: MatDialog
  ) {}
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
      userID: '1',
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
    console.log(rand);

    const botSquare = {
      id: rand.id,
      state: 'O',
    };
    this.gameService.changePlayerTurn(botSquare);
  }

  signIn() {
    // this.authGoogleServiceService.initLoginFlow();
  }
  openDialog() {
    this.dialog.open(UserDialogComponent, {
      height: '400px',
      width: '600px',
      data: { title: 'Scoreboard', showScoreboard: true }, // Pass your input value here
    });
  }
}
