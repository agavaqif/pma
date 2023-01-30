import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { combineLatest } from 'rxjs';

import { word } from 'src/app/core/utils/words';
import { IsCompletedService } from 'src/app/core/services/is-completed.service';
import { KpService } from 'src/app/core/services/kp.service';
import { MqService } from 'src/app/core/services/mq.service';
import { IKp } from 'src/app/shared/interfaces/kp.interface';
import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('selectMqModal') selectMqModal: ModalComponent;

  public projectKps: IKp[];
  public projectMqs: IMq[];

  constructor(private kpService: KpService, private mqService: MqService, private isCompletedService: IsCompletedService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const joinedWithObjectForm$ = combineLatest({
      kps: this.kpService.onKps(),
      mqs: this.mqService.onMqs(),
    });
    joinedWithObjectForm$.subscribe((data) => ((this.projectKps = data.kps), (this.projectMqs = data.mqs)));
    this.kpService.getKpsByProjectId(this.projectId);
    this.mqService.getAllMqs(this.projectId);
  }

  onAddSummary() {
    this.selectMqModal.open();
  }

  word = word;

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  // ! Test
  public fields: Object = { text: 'name', id: 'mqId' };
}
