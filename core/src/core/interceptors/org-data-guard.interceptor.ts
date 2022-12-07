// import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { User } from 'src/resources/user/entities/user.entity';
// import { UserRole } from 'src/shared/enums/user-role.enum';
// import { getOrgIdFromUrl } from '../utils/helpers';

// @Injectable()
// export class OrgDataGuardInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const user: User = request?.decodedBody?.user;
//     if (!user || user.role == UserRole.Admin) return next.handle();
//     const url: string = request.originalUrl;
//     const orgIdFromUrl: number = getOrgIdFromUrl(url);
//     if (orgIdFromUrl == 0) return next.handle();
//     const userOrgId = user.org.organizationId;
//     if (orgIdFromUrl != userOrgId) throw new ForbiddenException();
//     return next.handle();
//   }
// }
