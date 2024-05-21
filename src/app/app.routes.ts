import {Routes} from '@angular/router';
import { TournamentsComponent } from './content/tournaments/tournaments.component';
import { TeamsPickerComponent } from './content/teams-picker/teams-picker.component';

export const routes: Routes = [
    {path: '', redirectTo: '/tournaments', pathMatch: 'full'},
    {path: 'tournaments', component: TournamentsComponent},
    {path: 'tournaments/:tournament_id', component: TeamsPickerComponent},
];
