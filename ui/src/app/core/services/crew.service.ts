import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICrew, ICrewCreate } from 'src/app/shared/interfaces/crew.interface';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  baseUrl = (...path: any[]) => `${env.coreBaseUrl}/api/project${path.length ? '/' + path.join('/') : ''}`;

  public projectCrews: Subject<ICrew[]> = new Subject<ICrew[]>();

  getAllCrews(projectId: number) {
    this.http.get(this.baseUrl(projectId, 'crew')).subscribe((crews: any) => this.projectCrews.next(crews));
  }

  onCrews() {
    return this.projectCrews.asObservable();
  }

  getCrew(projectId: number, crewId: number) {
    return this.http.get(this.baseUrl(projectId, 'crew', crewId));
  }

  createCrew(projectId: number, crew: ICrewCreate) {
    return this.http.post(this.baseUrl(projectId, 'crew'), crew);
  }

  updateCrew(projectId: number, crewId: number, crew: ICrewCreate) {
    return this.http.patch(this.baseUrl(projectId, 'crew', crewId), crew);
  }

  deleteCrew(projectId: number, crewId: number) {
    return this.http.delete(this.baseUrl(projectId, 'crew', crewId));
  }

  constructor(private http: HttpClient) {}
}
