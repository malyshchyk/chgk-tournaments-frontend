/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideHttpClient(withFetch()),
      provideRouter(routes),
    ]
  })
  .catch(err => console.error(err));
