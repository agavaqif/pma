import { SettingsService } from './../services/settings.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ILoginResponse } from 'src/app/shared/models/login-response.model';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class IsCurrentUserGuard implements CanActivate {
  constructor(private settingsService: SettingsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userId = route.paramMap.get('userId');
    let userData: ILoginResponse = JSON.parse(localStorage.getItem('currentUser') || 'null');
    let token = userData.accessToken;
    const tokenPayload: any = decode(token);
    let currentUserId = tokenPayload.user.userId;
    return currentUserId === +userId ? true : this.router.createUrlTree(['/']);
  }
}
