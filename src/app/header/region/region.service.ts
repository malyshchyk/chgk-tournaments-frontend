import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private userRegionName = new BehaviorSubject<string>("");

  constructor() { }

  setUserRegionName(regionName: string) {
    this.userRegionName.next(regionName);
  }

  getUserRegionName() {
    return this.userRegionName.asObservable();
  }
}
