// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { ILoginResponse } from 'src/app/shared/models/login-response.model';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const currentUser: ILoginResponse = this.authService.currentUserValue;
//     if (currentUser && currentUser.accessToken) {
//       request = request.clone({
//         setHeaders: {
//           authorization: `Bearer ${currentUser.accessToken}`,
//         },
//       });
//     }
//     return next.handle(request);
//   }
// }

// export const jwtInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: JwtInterceptor,
//   multi: true,
// };
