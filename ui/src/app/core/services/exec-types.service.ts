import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IExecType } from 'src/app/shared/interfaces/exec-type.interface';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExecTypesService {
  baseUrl = (...path: any[]) => `${env.coreBaseUrl}/api/project${path.length ? '/' + path.join('/') : ''}`;

  public projectExecTypes: Subject<IExecType[]> = new Subject<IExecType[]>();

  getExecTypesByProjectId(projectId: number) {
    this.http.get(this.baseUrl(projectId, 'execType')).subscribe((execTypes: any) => this.projectExecTypes.next(execTypes));
  }

  onExecTypes() {
    return this.projectExecTypes.asObservable();
  }

  getExecType(projectId: number, execTypeId: number) {
    return this.http.get(this.baseUrl(projectId, 'execType', execTypeId));
  }

  createExecType(projectId: number, execType: IExecType) {
    return this.http.post(this.baseUrl(projectId, 'execType'), execType);
  }

  updateExecType(projectId: number, execTypeId: number, execType: IExecType) {
    return this.http.patch(this.baseUrl(projectId, 'execType', execTypeId), execType);
  }

  deleteExecType(projectId: number, execTypeId: number) {
    return this.http.delete(this.baseUrl(projectId, 'execType', execTypeId));
  }

  constructor(private http: HttpClient) {}
}
