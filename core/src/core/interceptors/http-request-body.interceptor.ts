// import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
// import { AuthService } from 'src/auth/service/auth.service';
// import { ProjectUserService } from 'src/resources/project/project-user.service';
// import { ProjectRole } from 'src/shared/enums/project-role';
// import { UserRole } from 'src/shared/enums/user-role.enum';
// import constantsMap from 'src/shared/settings/constants';

/**
 * Will check Project User status in Project and attach pu id to request
 */

// @Injectable()
// export class HttpRequestBodyInterceptor implements NestInterceptor {
//   constructor(private authService: AuthService, private projectUserService: ProjectUserService) {}
//   async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers['authorization'];
//     if (token) {
//       const decodedToken = this.authService.decodeJWT(token);
//       request.decodedBody = { ...decodedToken };
//       const user = decodedToken.user;
//       const target = 'project/';
//       if (request.url.includes(target)) {
//         if (user.role == UserRole.Admin || user.role == UserRole.OrgAdmin) {
//           request.pu = {
//             role: ProjectRole.Project_Admin,
//             projectUserId: constantsMap.get('projectAdminId'),
//           };
//         } else {
//           const index = request.url.indexOf(target);
//           const sub = request.url.substring(index + target.length);
//           const endIndex = sub.indexOf('/') == -1 ? sub.length : sub.indexOf('/');
//           const projectId = Number(sub.substring(0, endIndex));
//           const pu = await this.projectUserService.getUserProjectUser(projectId, user.userId);
//           if (pu == undefined || pu == null) throw new ForbiddenException();
//           request.pu = {
//             role: pu.projectRole,
//             projectUserId: pu.projectUserId,
//           };
//         }
//       }
//     }
//     return next.handle();
//   }
// }
