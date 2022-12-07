// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { AlertService } from '../services/alert.service';
// import { ErrorCode } from 'src/app/shared/enums/error-code.enum';
// import errorMessage from 'src/app/shared/enums/message-map';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService, private alertService: AlertService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError((err: HttpErrorResponse) => {
//         if (err.error instanceof ErrorEvent) {
//           let clientError = `Error: ${err.error.message}`;
//           console.log(clientError);
//         } else {
//           console.log(err);
//           let code = err?.error?.code || ErrorCode.INTERNAL_SERVER_ERROR;
//           if (code == ErrorCode.UNAUTHORIZED || code == ErrorCode.FORBIDDEN) {
//             this.authService.logOut();
//           } else {
//             let msg = errorMessage.get(code);
//             this.alertService.showToast(msg);
//           }
//         }
//         return throwError(err);
//       }),
//     );
//   }
// }

// export const errorInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: ErrorInterceptor,
//   multi: true,
// };
