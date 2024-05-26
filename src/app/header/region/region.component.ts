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
    {"id": 5, "name": "BY"},
    {"id": 21, "name": "RU"},
    {"id": 35, "name": "PL"},
  ]
  userRegionId!: number;

  constructor(private regionService: RegionService) {}

  async ngOnInit() {
    const response = await axios.get('https://ipapi.co/json/');
    switch (response.data.country) {
      case 'BY':
        this.userRegionId = 5;
        break;
      case 'RU':
        this.userRegionId = 21;
        break;
      default:
        this.userRegionId = 35;
        break;
    }
    this.regionService.setUserRegionId(this.userRegionId);
  }

  onRegionSelected(regionId: string) {
    this.userRegionId = Number(regionId);
    this.regionService.setUserRegionId(this.userRegionId);
  }
}
