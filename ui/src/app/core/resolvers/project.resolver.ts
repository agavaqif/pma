import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { IMeDetails } from 'src/app/shared/models/me-details.interface';
import { SettingsService } from '../services/settings.service';

/**
 * Esnures that me data is loaded
 */
@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<any> {
  constructor(private settingsService: SettingsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.settingsService
      .getCurrentProjectSettings(+route.params.projectId)
      .pipe(
        map((x: any) => {
          this.settingsService.setCurrentProjectSettings(x);
          return x;
        }),
      )
      .pipe(
        catchError((err) => {
          this.router.navigate(['/']);
          return null;
        }),
      );
  }
}
