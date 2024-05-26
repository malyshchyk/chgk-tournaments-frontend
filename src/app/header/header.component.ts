import { Component } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { RegionComponent } from './region/region.component';
import { UsernameComponent } from './username/username.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AvatarComponent,
    RegionComponent,
    UsernameComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
