import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 *? Auth guard will be called on some routes to protect them from anonymous users.
 */
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    //? If the id exists, will return truthy value, and falsy otherwise.
    return userId;
  }
}
