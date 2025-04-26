import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
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

  tournamentsRanges = [
    { "value": "3", "name": "3 месяца" },
    { "value": "6", "name": "6 месяцев" },
    { "value": "12", "name": "12 месяцев" },
  ];
  userTournamentRangeValue!: string;

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.ratingApiService.preloadCache(["BY", "RU", "EU", "East"], "12");
    this.isLoading = false;
    this.upcomingTournaments = this.ratingApiService.getTournamentsFromCache(this.regionName, this.userTournamentRangeValue);
  }

  constructor(
    private ratingApiService: RatingApiService,
    private regionService: RegionService
  ) {
    this.regionService.getUserRegionName().pipe(distinctUntilChanged()).subscribe(regionName => {
      if (!regionName) {
        return;
      }
      this.regionName = regionName;
      this.userTournamentRangeValue = this.userTournamentRangeValue || "3";
      this.upcomingTournaments = this.ratingApiService.getTournamentsFromCache(this.regionName, this.userTournamentRangeValue);
    });
  }

  onTournamentRangeSelected(tournamentRange: string): void {
    this.userTournamentRangeValue = tournamentRange;
    this.upcomingTournaments = this.ratingApiService.getTournamentsFromCache(this.regionName, this.userTournamentRangeValue);
  }
}
