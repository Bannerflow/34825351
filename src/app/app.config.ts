import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { mainRoutes } from './routes/main.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    SharedModule,
    CoreModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(mainRoutes),
  ],
};
