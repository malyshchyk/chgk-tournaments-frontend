import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingApiService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://fantasy.malyshchyk.com/api/v1';
  }

  getTeams(tournamentId: number) {
    return this.httpClient.get<any[]>(`${this.baseUrl}/tournaments/${tournamentId}/teams`);
  }

  getTournaments(regionName: string) {
    const eastCountries = [
      3, 4, 10, 11, 13, 16, 23, 25, 46
    ]
    const europeCountries = [
      6, 7, 8, 9, 12, 17, 18, 19, 20,
      27, 28, 29, 30, 31, 35, 42, 44,
      47, 48, 49, 52, 54, 55, 56, 57,
      61, 62, 65, 67, 68, 69, 70, 72,
      73, 74, 75
    ];
    let params = new HttpParams()
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

    return this.httpClient.get<any[]>(`${this.baseUrl}/tournaments`, { params });
  }
}
