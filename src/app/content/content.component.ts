import { Component } from '@angular/core';
import { TitleComponent } from './title/title.component';
import { TeamsPickerComponent } from './teams-picker/teams-picker.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    TitleComponent,
    TeamsPickerComponent,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
