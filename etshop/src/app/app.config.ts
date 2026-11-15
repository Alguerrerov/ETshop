import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { IDispositivoRepository } from './core/repositories/dispositivo-repository.interface';
import { DispositivoDummyJsonRepository } from './core/repositories/dispositivo-dummyjson.repository';
import { IComentarioRepository } from './core/repositories/comentario-repository.interface';
import { ComentarioDummyJsonRepository } from './core/repositories/comentario-dummyjson.repository';

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
    { provide: IDispositivoRepository, useClass: DispositivoDummyJsonRepository },
    { provide: IComentarioRepository, useClass: ComentarioDummyJsonRepository },
  ],
};
