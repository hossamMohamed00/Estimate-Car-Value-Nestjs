import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    return next.handle().pipe(
      map((userInstance: User) => {
        // Convert the user instance to match with the defined user dto.
        return plainToInstance(UserDto, userInstance, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
