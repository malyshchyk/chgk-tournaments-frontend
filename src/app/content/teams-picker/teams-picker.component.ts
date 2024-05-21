import { Component } from '@angular/core';
import { RatingApiService } from '../../rating-api.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teams-picker',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './teams-picker.component.html',
  styleUrl: './teams-picker.component.css'
})
export class TeamsPickerComponent {
  spendLimit = 100;
  score = 0;
  tournamentId!: number;

  teams: any[] = [];

  isLoading = false;

  constructor(
    private ratingApiService: RatingApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.tournamentId = params['tournament_id'];
      this.getTeams(this.tournamentId);
    });
  }

  getTeams(tournamentId: number): void {
    this.isLoading = true;
    this.ratingApiService.getTeams(tournamentId).subscribe(response => {
      this.teams = response;
      this.isLoading = false;
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
