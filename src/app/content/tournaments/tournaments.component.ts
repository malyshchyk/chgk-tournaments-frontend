import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-current-tournaments',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  tournaments = [
    { id: 9854, name: 'Студенческий Чемпионат Беларуси' },
    { id: 10728, name: 'Zhodino Minor 2024' },
    { id: 10749, name: 'Кубок 15-летия "Borisov Brain Club"' },
  ];

}
