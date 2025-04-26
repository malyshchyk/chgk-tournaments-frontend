import { Component } from '@angular/core';
import axios from 'axios';
import { RegionService } from './region.service';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent {
  regions = [
    { "id": "BY", "name": "BY" },
    { "id": "RU", "name": "RU" },
    { "id": "EU", "name": "EU" },
    { "id": "East", "name": "East" },
  ]
  userRegionName!: string;

  constructor(private regionService: RegionService) { }

  async ngOnInit() {
    const response = await axios.get('https://ipapi.co/json/');
    switch (response.data.country) {
      case 'BY':
      case 'RU':
        this.userRegionName = response.data.country;
        break;
      default:
        this.userRegionName = "EU";
        break;
    }
    this.regionService.setUserRegionName(this.userRegionName);
  }

  onRegionSelected(regionName: string) {
    if (this.userRegionName === regionName) {
      return;
    }
    this.userRegionName = regionName;
    this.regionService.setUserRegionName(this.userRegionName);
  }
}
