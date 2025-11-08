import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  log(error: any) {
    // Можно интегрировать Sentry или другой сервис
    console.error('Logged error:', error);
  }
}

