import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class SerializeInterceptor implements NestInterceptor {
  /**
   * Accept any dto to serialize
   * @param dto - Any dto to serialize the response as it.
   */
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    return next.handle().pipe(
      map((userInstance: User) => {
        // Convert the user instance to match with the defined user dto.
        return plainToInstance(this.dto, userInstance, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
