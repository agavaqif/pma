import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { mqUnits } from 'src/app/shared/enums/mq-unit.enum';
import { word } from 'src/app/core/utils/words';
import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { MqService } from 'src/app/core/services/mq.service';
import { AddStepsComponent } from '../add-steps/add-steps.component';
import { IMqStep } from 'src/app/shared/interfaces/mq-step.interface';
import { StepsTableComponent } from '../steps-table/steps-table.component';

@Component({
  selector: 'app-project-mqs',
  templateUrl: './project-mqs.component.html',
  styleUrls: ['./project-mqs.component.scss'],
})
export class ProjectMqsComponent implements OnInit {
  mqs: IMq[];

  // Add Step Modal
  @ViewChild('addStepDialog') addStepDialog: AddStepsComponent;

  onClickAddStep() {
    this.addStepDialog.openModal();
  }

  // Steps Table
  @ViewChild('stepsTable') stepsTable: StepsTableComponent;
  selectedMq: IMq;
  onSetSteps(steps: Partial<IMqStep>[]) {
    this.addedSteps = steps;
    console.log({ steps: this.addedSteps });
  }

  // Modals
  @ViewChild('addMqDialog') addMqDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns() {
    this.btns = [
      { click: this.onSubmit.bind(this), buttonModel: { content: 'Create', isPrimary: true } },
      { click: this.closeAddMqDialog.bind(this), buttonModel: { content: 'Cancel' } },
    ];
  }

  public openAddMqDialog(): void {
    this.initForm();
    this.addMqDialog?.show();
  }

  public closeAddMqDialog(): void {
    this.mqForm.reset();
    this.addedSteps = [];
    this.addMqDialog?.hide();
  }

  @ViewChild('viewStepsDialog') viewStepsDialog: DialogComponent;
  public openViewStepsDialog(mq: IMq): void {
    this.selectedMq = mq;
    this.viewStepsDialog?.show();
  }

  public closeViewStepsDialog(): void {
    this.selectedMq = null;
    this.viewStepsDialog?.hide();
  }

  // Forms
  public mqForm: FormGroup;
  public addedSteps: Partial<IMqStep>[] = [];
  public initForm() {
    this.mqForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isBalanced: new FormControl(false),
      quantity: new FormControl(''),
      unitOfMeasure: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  public onAddStep(step: Partial<IMqStep>) {
    this.addedSteps.push({ ...step, order: this.addedSteps.length + 1 });
    this.stepsTable?.refreshGrid();
  }

  onSubmit() {
    const isStepsFull = this.addedSteps.reduce((acc, { weight }) => acc + weight, 0) === 100;
    if (this.mqForm.valid && isStepsFull) {
      const { name, isBalanced, unitOfMeasure, quantity } = this.mqForm.value;
      const mqSteps = this.stepsTable?.getSteps();
      const body = {
        name,
        isBalanced,
        ...(!isBalanced ? { quantity: +quantity } : {}),
        unitOfMeasure: +unitOfMeasure,
        mqSteps,
      };
      this.mqService.createMq(this.projectId, body).subscribe(() => this.mqService.getAllMqs(this.projectId));
      this.closeAddMqDialog();
    } else if (!this.mqForm.valid) {
      this.mqForm.markAllAsTouched();
    } else if (!isStepsFull) {
      alert('Steps weight must be 100%');
    }
  }

  get isBalanced() {
    return this.mqForm.get('isBalanced').value;
  }

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  word = word;
  mqUnitOptions = Object.entries(mqUnits).map((mqUnit) => ({ value: mqUnit[0], text: mqUnit[1] }));
  mqUnits = mqUnits;

  constructor(private mqService: MqService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.mqService.onMqs().subscribe((mqs) => (this.mqs = mqs));
    this.mqService.getAllMqs(this.projectId);
    this.initTarget();
    this.initForm();
    this.initBtns();
  }
}
