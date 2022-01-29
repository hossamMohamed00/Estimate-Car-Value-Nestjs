import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

//? Define interface to ensure that the type of the incoming dto is  class
interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * Export this func to act as decorator for serialization
 * @param dto
 * @returns Call of SerializeInterceptor with the given dto
 */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

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
      map((userInstance: any) => {
        // Convert the user instance to match with the defined user dto.
        return plainToInstance(this.dto, userInstance, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
