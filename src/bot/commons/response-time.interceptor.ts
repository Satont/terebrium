import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from '../../modules/logger';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(tap(() => logger.log(`Response time: ${Date.now() - start}ms`)));
  }
}
