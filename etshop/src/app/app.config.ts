import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { IDispositivoRepository } from './core/repositories/dispositivo-repository.interface';
import { DispositivoJsonRepository } from './core/repositories/dispositivo-json.repository';
import { IComentarioRepository } from './core/repositories/comentario-repository.interface';
import { ComentarioJsonRepository } from './core/repositories/comentario-json.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideIonicAngular({}),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    { provide: IDispositivoRepository, useClass: DispositivoJsonRepository },
    { provide: IComentarioRepository, useClass: ComentarioJsonRepository },
  ],
};
