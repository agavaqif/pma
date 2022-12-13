import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MqService {
  baseUrl = (...path: any[]) => `${env.coreBaseUrl}/api/project${path.length ? '/' + path.join('/') : ''}`;

  public projectMqs: Subject<IMq[]> = new Subject<IMq[]>();

  getAllMqs(projectId: number) {
    this.http.get(this.baseUrl(projectId, 'mq')).subscribe((mqs: any) => this.projectMqs.next(mqs));
  }

  onMqs() {
    return this.projectMqs.asObservable();
  }

  getMq(projectId: number, mqId: number) {
    return this.http.get(this.baseUrl(projectId, 'mq', mqId));
  }

  createMq(projectId: number, mq: IMq) {
    return this.http.post(this.baseUrl(projectId, 'mq'), mq);
  }

  updateMq(projectId: number, mqId: number, mq: IMq) {
    return this.http.patch(this.baseUrl(projectId, 'mq', mqId), mq);
  }

  deleteMq(projectId: number, mqId: number) {
    return this.http.delete(this.baseUrl(projectId, 'mq', mqId));
  }

  constructor(private http: HttpClient) {}
}
