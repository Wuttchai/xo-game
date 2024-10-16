import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  constructor(public gameService: GameService) {}

  ngOnInit() {}

  changePlayer(square: any) {
    console.log(square);
    this.gameService.isGameRunning = true;

    if (this.gameService.isGameRunning && square.state === null) {
      square.state = this.gameService.activePlayer;
      this.gameService.changePlayerTurn(square);
    }
  }
}
