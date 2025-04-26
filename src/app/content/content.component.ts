import { Component } from '@angular/core';
import { TitleComponent } from './title/title.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    TitleComponent,
    TournamentsComponent,
    RouterOutlet,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
