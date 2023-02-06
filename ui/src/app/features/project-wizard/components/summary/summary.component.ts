import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { combineLatest } from 'rxjs';

import { word } from 'src/app/core/utils/words';
import { IsCompletedService } from 'src/app/core/services/is-completed.service';
import { KpService } from 'src/app/core/services/kp.service';
import { MqService } from 'src/app/core/services/mq.service';
import { IKp } from 'src/app/shared/interfaces/kp.interface';
import { IMq, PartialMq } from 'src/app/shared/interfaces/mq.interface';
import { IBtn, ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { IisCompleted } from 'src/app/shared/interfaces/is-completed.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('checklist') checklist: ListViewComponent;
  @ViewChild('selectMqModal') selectMqModal: ModalComponent;

  public mqModalBtns: IBtn[] = mqModalBtns;
  public selectedMqs: PartialMq[] = [];
  public gridData: any[] = [];

  public projectKps: IKp[];
  public projectMqs: IMq[];
  public isCompleted: IisCompleted[] = [];

  constructor(private kpService: KpService, private mqService: MqService, private isCompletedService: IsCompletedService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initData();
    this.initMqModalBtns();
  }

  initData() {
    const joinedWithObjectForm$ = combineLatest({
      kps: this.kpService.onKps(),
      mqs: this.mqService.onMqs(),
    });
    joinedWithObjectForm$.subscribe((data) => ((this.projectKps = data.kps), (this.projectMqs = data.mqs), this.initGridData()));
    this.kpService.getKpsByProjectId(this.projectId);
    this.mqService.getAllMqs(this.projectId);
  }

  initGridData() {
    this.gridData = this.projectKps?.map(({ kpId, start, end }) => {
      let mqs = {};
      this.selectedMqs.forEach(({ mqId, name }) => {
        const steps = this.isCompleted.filter((item) => item.mq.mqId === mqId && item.kp.kpId === kpId);
        const isAllCompleted = steps.length === 0 ? null : steps.every((item) => item.isCompleted);
        mqs = { ...mqs, [`${name}`]: isAllCompleted };
      });
      return { kpId, start, end, ...mqs };
    });
  }

  initMqModalBtns() {
    this.mqModalBtns[0].click = this.onSelectMqs.bind(this);
    this.mqModalBtns[1].click = this.onCloseMqModal.bind(this);
  }

  onAddSummary() {
    this.selectMqModal.open();
  }

  onSelectMqs() {
    this.selectedMqs = this.checklist.getSelectedItems().data as PartialMq[];
    console.log({ selectedMqs: this.selectedMqs });
    if (this.selectedMqs.length) {
      this.isCompletedService.findAllByProjectId(this.projectId).subscribe((data) => {
        this.isCompleted = data;
        this.initGridData();
        this.onCloseMqModal();
      });
    }
  }

  onCloseMqModal() {
    this.selectMqModal.close();
  }

  word = word;

  get projectId() {
    return +this.route.parent.snapshot.paramMap.get('projectId');
  }

  // ! Test
  public fields: Object = { text: 'name', id: 'mqId' };
}

const mqModalBtns: IBtn[] = [
  {
    click: null,
    text: word('SAVE'),
    isPrimary: true,
  },
  {
    click: null,
    text: word('CANCEL'),
    cssClass: 'e-outline',
  },
];
