import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Admin Guard 🥇🥇');

    const request = context.switchToHttp().getRequest();

    //? If the user not logged in, reject the request
    if (!request.currentUser) return false;

    //? If the logged in user has the property admin, approve the request.
    return request.currentUser.admin;
  }
}
