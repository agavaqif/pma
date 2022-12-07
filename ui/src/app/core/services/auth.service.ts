import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ILoginResponse } from 'src/app/shared/models/login-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ILoginResponse>;

  clearingTime: any;

  constructor(private http: HttpClient, private router: Router) {
    this.initilize();
  }

  public get currentUserValue(): ILoginResponse {
    return this.currentUserSubject.value;
  }

  public onUser() {
    return this.currentUserSubject.asObservable();
  }

  logIn(email: string, password: string) {
    this.http
      .post<ILoginResponse>(`${environment.coreBaseUrl}/api/user/login`, { email, password })
      .pipe(tap(this.handleUser.bind(this)))
      .toPromise();
  }

  handleUser(res: ILoginResponse) {
    this.currentUserSubject.next(res);
    localStorage.setItem('currentUser', JSON.stringify(res));
    this.autoLogout(res.expiresIn);
    this.router.navigate(['/']);
    return res;
  }

  /**
   *
   * @param expiresIn Epoch Time
   */
  autoLogout(expiresIn: number) {
    let currentTime = Date.now();
    this.clearingTime = setTimeout(() => {
      this.logOut();
    }, expiresIn * 1000 - currentTime);
  }

  logOut() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    if (this.clearingTime) {
      clearTimeout(this.clearingTime);
    }
    this.router.navigate(['/auth/login']);
  }

  initilize() {
    let userData: ILoginResponse = JSON.parse(localStorage.getItem('currentUser') || 'null');
    let isExpired: boolean = !userData || userData.expiresIn * 1000 < Date.now();
    this.currentUserSubject = new BehaviorSubject<ILoginResponse>(userData);
    if (!isExpired) {
      this.autoLogout(userData.expiresIn);
    } else {
      this.logOut();
    }
  }
}
