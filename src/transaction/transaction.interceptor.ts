import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getManager } from 'typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return new Observable((observer) => {
      const queryRunner = getManager().connection.createQueryRunner();
      queryRunner.connect();
      queryRunner.startTransaction();

      request.transaction = queryRunner;

      return next
        .handle()
        .pipe(
          tap(() => queryRunner.commitTransaction()),
          tap(() => queryRunner.release()),
        )
        .subscribe({
          next: (data) => observer.next(data),
          error: (error) => {
            queryRunner.rollbackTransaction();
            observer.error(error);
          },
          complete: () => observer.complete(),
        });
    });
  }
}
