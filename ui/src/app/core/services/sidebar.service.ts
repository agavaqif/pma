import { word } from './../utils/words';
import { Injectable } from '@angular/core';
import { ISidebarLink } from 'src/app/shared/interfaces/sidebar.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidbarLinks: BehaviorSubject<ISidebarLink[]> = new BehaviorSubject([]);

  onSidebarLinks() {
    return this.sidbarLinks.asObservable();
  }

  setProjectWizardLinks(projectId: string) {
    this.sidbarLinks.next(this.projectWizardLinks(projectId));
  }

  setHomeLinks() {
    this.sidbarLinks.next([]);
  }

  projectWizardLinks(projectId: string): ISidebarLink[] {
    return projectWizardLinks.map(({ url, ...rest }) => ({
      url: `projectWizard/${projectId}/${url}`,
      ...rest,
    }));
  }
}

const projectWizardLinks: ISidebarLink[] = [
  {
    nodeId: '01',
    nodeText: word('EXEC_TYPES'),
    icon: 'fa fa-cogs',
    url: 'executionType',
  },
  {
    nodeId: '02',
    nodeText: word('PROJECT_KPS'),
    icon: 'fa fa-map-marker',
    url: 'kp',
  },
  {
    nodeId: '03',
    nodeText: word('MEASUREMENT_QUANTITIES'),
    icon: 'fa fa-balance-scale',
    url: 'mq',
  },
  {
    nodeId: '04',
    nodeText: word('PIPELINE_MANAGER'),
    icon: 'fa-solid fa-timeline',
    url: 'pipelineManager',
  },
  {
    nodeId: '05',
    nodeText: word('CREWS'),
    icon: 'fa fa-users',
    url: 'crew',
  },
  {
    nodeId: '06',
    nodeText: word('KP_ASSIGNMENTS'),
    icon: 'fa fa-map-signs',
    url: 'kpAssignment',
  },
  {
    nodeId: '07',
    nodeText: word('SUMMARY'),
    icon: 'fa fa-list',
    url: 'summary',
  },
];
