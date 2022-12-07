// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from 'src/resources/user/entities/user.entity';

// export const UserDecorator = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
//   const request = ctx.switchToHttp().getRequest();
//   const user: User = request?.decodedBody?.user;
//   return user;
// });
