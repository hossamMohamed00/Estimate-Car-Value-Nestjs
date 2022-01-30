import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  /**
   * ExecutionContext -> is a wrapper above the incoming request
   */
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    //? The currentUser object is attached to the request from the CurrentUserInterceptor.
    return request.currentUser;
  }
);
