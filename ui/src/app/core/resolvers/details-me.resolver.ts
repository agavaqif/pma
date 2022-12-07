import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { IMeDetails } from 'src/app/shared/models/me-details.interface';
import { SettingsService } from '../services/settings.service';

/**
 * Esnures that me data is loaded
 */
@Injectable({
  providedIn: 'root',
})
export class DetailsMeResolver implements Resolve<any> {
  constructor(private settingsService: SettingsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.settingsService.getMe().pipe(
      map((x: IMeDetails) => {
        this.settingsService.setCurrentSettings(x);
        return x;
      }),
    );
  }
}
