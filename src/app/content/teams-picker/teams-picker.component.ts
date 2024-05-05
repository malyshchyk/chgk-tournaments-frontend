import { Component } from '@angular/core';
import { RatingApiService } from '../../rating-api.service';

@Component({
  selector: 'app-teams-picker',
  standalone: true,
  imports: [],
  templateUrl: './teams-picker.component.html',
  styleUrl: './teams-picker.component.css'
})
export class TeamsPickerComponent {
  spendLimit = 100;
  score = 0;
  tournamentId = 9854;

  teams: any[] = [];

  constructor(ratingApiService: RatingApiService) {
    ratingApiService.getTeams(this.tournamentId).subscribe(response => {
      this.teams = response;
    });
  }

  pickTeam(team: any) {
    const teamIndex = this.teams.findIndex(t => t.name === team.name);
    if (teamIndex !== -1) {
      if (!this.teams[teamIndex].picked && this.score + team.cost > this.spendLimit) {
        return;
      }
      this.teams[teamIndex].picked = !this.teams[teamIndex].picked;
      if (this.teams[teamIndex].picked) {
        this.score += this.teams[teamIndex].cost;
      } else {
        this.score -= this.teams[teamIndex].cost;
      }
    }
  }

  clearAll() {
    this.teams.forEach(team => team.picked = false);
    this.score = 0;
  }

}
