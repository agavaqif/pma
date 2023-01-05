import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MqStepService {
  baseUrl = (...path: any[]) => `${env.coreBaseUrl}/api/project${path.length ? '/' + path.join('/') : ''}`;

  constructor() {}
}
