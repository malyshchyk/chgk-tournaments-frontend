import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private userRegionId = new BehaviorSubject<number>(35);

  constructor() { }

  setUserRegionId(regionId: number) {
    this.userRegionId.next(regionId);
  }

  getUserRegionId() {
    return this.userRegionId.asObservable();
  }
}
