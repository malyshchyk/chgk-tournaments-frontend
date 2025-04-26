import {Routes} from '@angular/router';
import { TournamentsComponent } from './content/tournaments/tournaments.component';

export const routes: Routes = [
    {path: '', redirectTo: '/tournaments', pathMatch: 'full'},
    {path: 'tournaments', component: TournamentsComponent},
];
