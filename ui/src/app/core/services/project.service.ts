import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = 'http://localhost:3000/project';
  projects: Subject<any[]> = new Subject<any[]>();

  constructor(private http: HttpClient) {}

  getProjects() {
    this.http.get(this.baseUrl).subscribe((projects: any) => this.projects.next(projects));
  }

  onProjects() {
    return this.projects.asObservable();
  }

  getProject(projectId: string) {
    return this.http.get(`${this.baseUrl}/${projectId}`);
  }

  createProject(project: any) {
    return this.http.post(this.baseUrl, project);
  }

  updateProject(projectId: string, project: any) {
    return this.http.patch(`${this.baseUrl}/${projectId}`, project);
  }

  deleteProject(projectId: string) {
    return this.http.delete(`${this.baseUrl}/${projectId}`);
  }
}
