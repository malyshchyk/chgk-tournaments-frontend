import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { RatingApiService } from '../../rating-api.service';

@Component({
  selector: 'app-current-tournaments',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  isLoadingPast = false;
  isLoadingUpcoming = false;
  countryId = 5;
  pastTournaments: any[] = [];
  upcomingTournaments: any[] = [];

  constructor(
    private ratingApiService: RatingApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(() => {
      this.getTournaments(this.countryId);
    });
  }

  getTournaments(countryId: number): void {
    this.isLoadingPast = true;
    this.isLoadingUpcoming = true;
    this.ratingApiService.getTournaments(countryId, true).subscribe(response => {
      this.pastTournaments = response;
      this.isLoadingPast = false;
    });
    this.ratingApiService.getTournaments(countryId, false).subscribe(response => {
      this.upcomingTournaments = response;
      this.isLoadingUpcoming = false;
    });
  }
}
