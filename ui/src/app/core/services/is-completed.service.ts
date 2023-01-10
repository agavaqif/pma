import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

interface ICompletedStep {
  crewId: number;
  completedDate: string;
  note: string;
}

@Injectable({
  providedIn: 'root',
})
export class IsCompletedService {
  baseUrl = env.coreBaseUrl + '/api/isCompleted';

  findAllByProjectId(projectId: number) {
    return this.http.get<any[]>(this.baseUrl + '/findAll', { params: { projectId } });
  }

  completeStep(IsCompletedId: number, isCompleted: ICompletedStep) {
    return this.http.patch(`${this.baseUrl}/${IsCompletedId}/complete`, isCompleted);
  }

  constructor(private http: HttpClient) {}
}
