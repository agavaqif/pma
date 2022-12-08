import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IKp, IKpCreate } from 'src/app/shared/interfaces/kp.interface';

@Injectable({
  providedIn: 'root',
})
export class KpService {
  baseUrl(...path: any[]) {
    return `http://localhost:3000/api/project${path.length ? '/' + path.join('/') : ''}`;
  }
  projectKps: Subject<IKp[]> = new Subject<IKp[]>();

  constructor(private http: HttpClient) {}

  getKpsByProjectId(projectId: number) {
    this.http.get(this.baseUrl(projectId, 'kp')).subscribe((kps: any) => this.projectKps.next(kps));
  }

  onKps() {
    return this.projectKps.asObservable();
  }

  getKp(projectId: number, kpId: number) {
    return this.http.get(this.baseUrl(projectId, 'kp', kpId));
  }

  createKp(projectId: number, kp: IKpCreate) {
    return this.http.post(this.baseUrl(projectId, 'kp'), kp);
  }

  updateKp(projectId: number, kpId: number, kp: IKpCreate) {
    return this.http.patch(this.baseUrl(projectId, 'kp', kpId), kp);
  }

  deleteKp(projectId: number, kpId: number) {
    return this.http.delete(this.baseUrl(projectId, 'kp', kpId));
  }
}
