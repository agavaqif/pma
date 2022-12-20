import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

import { IProject } from 'src/app/shared/interfaces/project.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl(...path: any[]) {
    return `${environment.coreBaseUrl}/api/project${path.length ? '/' + path.join('/') : ''}`;
  }
  projects: Subject<IProject[]> = new Subject<IProject[]>();

  constructor(private http: HttpClient) {}

  getProjects() {
    this.http.get(this.baseUrl()).subscribe((projects: any) => {
      this.projects.next(projects);
      console.log({ projects });
    });
  }

  onProjects() {
    return this.projects.asObservable();
  }

  getProject(projectId: string) {
    return this.http.get(this.baseUrl(projectId));
  }

  createProject(project: any) {
    return this.http.post(this.baseUrl(), project);
  }

  updateProject(projectId: string, project: any) {
    return this.http.patch(this.baseUrl(projectId), project);
  }

  deleteProject(projectId: string) {
    return this.http.delete(this.baseUrl(projectId));
  }

  getProjectSettings(projectId: number) {
    return this.http.get<IProject>(this.baseUrl(projectId)).pipe(
      map(({ projectSettings: { kpUnit, accuracy }, kps }) => ({
        kpUnit,
        accuracy,
        start: kps.reduce((min, kp) => (kp.start < min ? kp.start : min), Infinity),
        end: kps.reduce((max, kp) => (kp.end > max ? kp.end : max), -Infinity),
      })),
    );
  }
}
