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

  getTournaments(countryId: number) {
    let params = new HttpParams()
      .set('countryId', countryId.toString());
  
    return this.httpClient.get<any[]>(`${this.baseUrl}/tournaments`, { params });
  }
}
