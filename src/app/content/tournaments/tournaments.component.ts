import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { RatingApiService } from '../../rating-api.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-current-tournaments',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoaderComponent,
  ],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  isLoading = false;
  countryId = 5;
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
    this.isLoading = true;
    this.ratingApiService.getTournaments(countryId).subscribe(response => {
      this.upcomingTournaments = response;
      this.isLoading = false;
    });
  }
}
