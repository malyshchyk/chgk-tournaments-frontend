import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingApiService {
  baseUrl: string;
  private tournamentsCache: { [key: string]: any[] } = {};

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://chgk.malyshchyk.com/api/v1';
  }

  private filterTournamentsByMonths(tournaments: any[], months: number): any[] {
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMonth(now.getMonth() + months);

    return tournaments.filter(tournament => {
      const tournamentDate = new Date(tournament.dateEnd);
      return tournamentDate >= now && tournamentDate <= cutoffDate;
    });
  }

  async getTournaments(regionName: string, upperBoundMonths: string): Promise<any[] | null> {
    const cacheKey = `${regionName}-${upperBoundMonths}`;
    if (this.tournamentsCache[cacheKey]) {
      return this.tournamentsCache[cacheKey];
    }

    const eastCountries = [3, 4, 10, 11, 13, 16, 23, 25, 46];
    const europeCountries = [
      6, 7, 8, 9, 12, 17, 18, 19, 20, 27, 28, 29, 30, 31, 35, 42, 44,
      47, 48, 49, 52, 54, 55, 56, 57, 61, 62, 65, 67, 68, 69, 70, 72,
      73, 74, 75
    ];

    let params = new HttpParams();
    switch (regionName) {
      case 'BY':
        params = params.set('countryId', 5);
        break;
      case 'RU':
        params = params.set('countryId', 21);
        break;
      case 'EU':
        for (const countryId of europeCountries) {
          params = params.append('countryId', countryId.toString());
        }
        break;
      case 'East':
        for (const countryId of eastCountries) {
          params = params.append('countryId', countryId.toString());
        }
        break;
    }
    params = params.append('upperBoundMonths', upperBoundMonths);

    const response = await firstValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}/tournaments`, { params }));
    if (!response) {
      return null;
    }

    this.tournamentsCache[cacheKey] = response;

    if (upperBoundMonths === "12") {
      this.tournamentsCache[`${regionName}-3`] = this.filterTournamentsByMonths(response, 3);
      this.tournamentsCache[`${regionName}-6`] = this.filterTournamentsByMonths(response, 6);
    }
    return response;
  }

  async preloadCache(regionNames: string[], upperBoundMonths: string): Promise<void> {
    const preloadPromises = [];

    for (const regionName of regionNames) {
      const cacheKey = `${regionName}-${upperBoundMonths}`;
      if (!this.tournamentsCache[cacheKey]) {
        preloadPromises.push(
          this.getTournaments(regionName, upperBoundMonths)
        );
      }
    }
    await Promise.all(preloadPromises);
  }

  getTournamentsFromCache(regionName: string, upperBoundMonths: string): any[] {
    const cacheKey = `${regionName}-${upperBoundMonths}`;
    if (this.tournamentsCache[cacheKey]) {
      return this.tournamentsCache[cacheKey];
    }
    return [];
  }
}
