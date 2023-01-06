import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IsCompletedService {
  baseUrl = env.coreBaseUrl + '/api/isCompleted';

  findAllByProjectId(projectId: number) {
    return this.http.get<any[]>(this.baseUrl + '/findAll', { params: { projectId } });
  }

  updateStep(IsCompletedId: number, isCompleted: boolean) {
    return this.http.patch(`${this.baseUrl}/${IsCompletedId}`, { isCompleted });
  }

  constructor(private http: HttpClient) {}
}
