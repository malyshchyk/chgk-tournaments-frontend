import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { RatingApiService } from '../../rating-api.service';
import { LoaderComponent } from '../loader/loader.component';
import { RegionService } from '../../header/region/region.service';

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
  regionName!: string;
  upcomingTournaments: any[] = [];

  constructor(
    private ratingApiService: RatingApiService,
    private route: ActivatedRoute,
    private regionService: RegionService
  ) {
    this.regionService.getUserRegionName().subscribe(regionName => {
      if (!regionName) {
        return;
      }
      this.regionName = regionName;
      this.getTournaments(this.regionName);
    });
    this.route.params.subscribe(() => {});
  }

  getTournaments(regionName: string): void {
    this.isLoading = true;
    this.ratingApiService.getTournaments(regionName).subscribe(response => {
      this.upcomingTournaments = response;
      this.isLoading = false;
    });
  }
}
