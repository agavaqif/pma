import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KpService } from 'src/app/core/services/kp.service';
import { word } from 'src/app/core/utils/words';
import { IKp } from 'src/app/shared/interfaces/kp.interface';
import { MqService } from 'src/app/core/services/mq.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { IsCompletedService } from 'src/app/core/services/is-completed.service';
import { IisCompleted } from 'src/app/shared/interfaces/is-completed.interface';

@Component({
  selector: 'app-kp-assignments',
  templateUrl: './kp-assignments.component.html',
  styleUrls: ['./kp-assignments.component.scss'],
})
export class KpAssignmentsComponent implements OnInit {
  @ViewChild('grid') grid: GridComponent;

  public projectKps: IKp[];
  public projectMqs: IMq[];
  public isCompletedData: IisCompleted[] = [];
  public gridData: any[] = [];
  public selectedMq: IMq;
  public mqOptions: { value: number; text: string }[] = [];
  public mqForm: FormGroup;

  getMqSteps() {}

  constructor(private kpService: KpService, private route: ActivatedRoute, private mqService: MqService, private isCompletedService: IsCompletedService) {}

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  word = word;

  ngOnInit(): void {
    this.kpService.onKps().subscribe((kps) => (this.projectKps = kps));
    this.mqService.onMqs().subscribe((mqs) => {
      this.mqOptions = mqs.map(({ mqId, name }) => ({ value: mqId, text: name }));
      this.projectMqs = mqs;
      this.resetGridData();
    });

    this.mqForm = new FormGroup({ mqId: new FormControl('') });
    this.isCompletedService.findAllByProjectId(this.projectId).subscribe((data) => (this.isCompletedData = data));
    this.kpService.getKpsByProjectId(this.projectId);
    this.mqService.getAllMqs(this.projectId);
  }

  onSelectMq({ value }: any) {
    this.selectedMq = this.projectMqs.find(({ mqId }) => mqId === value) || null;
    if (this.selectedMq) {
      this.isCompletedService.findAllByProjectId(this.projectId).subscribe((data) => {
        this.isCompletedData = data;
        this.initGridData();
      });
    } else {
      this.resetGridData();
    }
  }

  initGridData() {
    this.gridData = this.projectKps.map(({ kpId, start, end }) => {
      let steps = {};
      this.selectedMq.mqSteps.forEach(({ stepId, title }) => {
        const isCompleted = this.isCompletedData.find(({ kp, mqStep, isCompletedId }) => kp.kpId === kpId && mqStep.stepId === stepId);
        steps = { ...steps, [`${title}`]: isCompleted ? isCompleted.isCompleted : null };
      });
      return { kpId, start, end, ...steps };
    });
  }

  resetGridData() {
    this.gridData = this.projectKps.map(({ kpId, start, end }) => ({ kpId, start, end }));
    this.selectedMq = null;
    this.mqForm.reset();
    this.grid.refresh();
  }

  updateStep(kpId: number, stepId: number, isCompleted: boolean) {
    if (isCompleted !== null) {
      const isCompletedId = this.isCompletedData.find(({ kp, mqStep }) => kp.kpId === kpId && mqStep.stepId === stepId)?.isCompletedId;
      if (isCompletedId)
        this.isCompletedService.updateStep(isCompletedId, !isCompleted).subscribe(() =>
          this.isCompletedService.findAllByProjectId(this.projectId).subscribe((data) => {
            this.isCompletedData = data;
            this.initGridData();
          }),
        );
    }
  }
}
