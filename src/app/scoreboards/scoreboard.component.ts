import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GetScoreboard } from '../services/interfaces/get-scoreboard.interface';
interface UserData {
  id: number;
  name: string;
  email: string;
}

const ELEMENT_DATA: GetScoreboard[] = [
  { UserName: '1', Point: 'John Doe', CreateDate: 'john@example.com' },
  // more data
];
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = ELEMENT_DATA;
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe((data: GetScoreboard[]) => {
      this.dataSource = data;
    });
  }
}
