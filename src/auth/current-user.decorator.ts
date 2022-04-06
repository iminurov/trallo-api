import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, req) => {
  const request = req.switchToHttp().getRequest();

  return request.user;
});
