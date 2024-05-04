import { Component } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { TitleComponent } from './title/title.component';
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SummaryComponent,
    TitleComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'resume';
}
