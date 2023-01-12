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
import { GridComponent } from '@syncfusion/ej2-angular-grids';

enum MqActions {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  DETAILS = 'details',
}

@Component({
  selector: 'app-project-mqs',
  templateUrl: './project-mqs.component.html',
  styleUrls: ['./project-mqs.component.scss'],
})
export class ProjectMqsComponent implements OnInit {
  public mqs: IMq[];

  @ViewChild('grid') grid: GridComponent;
  public gridColumns = gridColumns;
  public mqActions = MqActions;

  setRecord() {
    this.selectedMq = this.grid?.getSelectedRecords()[0] as IMq;
  }

  clearRecord() {
    this.selectedMq = null;
  }

  getUnit(unit: number) {
    return mqUnits[unit as keyof typeof mqUnits];
  }

  toolbarClick(action: MqActions = MqActions.CREATE) {
    this.mqModalActions = action;
    this.initForm();
    this.openMqDialog();
  }

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
  @ViewChild('mqDialog') mqDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public mqModalActions: MqActions = null;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);

  public openMqDialog(): void {
    this.initForm();
    this.mqDialog?.show();
  }

  public closeMqDialog(): void {
    this.mqForm.reset();
    this.addedSteps = [];
    this.selectedMq = null;
    this.mqModalActions = null;
    this.grid?.clearSelection();
    this.mqDialog?.hide();
  }

  // Forms
  public mqForm: FormGroup;
  public addedSteps: Partial<IMqStep>[] = [];
  public initForm() {
    const { name, isBalanced, unitOfMeasure, quantity } = this.selectedMq || {};
    if ([MqActions.DETAILS, MqActions.UPDATE].includes(this.mqModalActions)) {
      return (this.mqForm = new FormGroup({
        name: new FormControl(name, [Validators.required, Validators.maxLength(50)]),
        isBalanced: new FormControl(isBalanced),
        quantity: new FormControl(quantity),
        unitOfMeasure: new FormControl(this.mqModalActions === MqActions.DETAILS ? this.getUnit(unitOfMeasure) : unitOfMeasure, [Validators.required, Validators.maxLength(50)]),
      }));
    } else if (this.mqModalActions === MqActions.CREATE) {
      return (this.mqForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        isBalanced: new FormControl(false),
        quantity: new FormControl(''),
        unitOfMeasure: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      }));
    }
    return this.mqForm?.reset();
  }

  public onAddStep(step: Partial<IMqStep>) {
    this.addedSteps.push({ ...step, order: this.addedSteps.length + 1 });
    this.stepsTable?.refreshGrid();
  }

  onSubmit() {
    const isStepsFull = this.addedSteps.reduce((acc, { weight }) => acc + weight, 0) === 100;
    if (this.mqForm.valid) {
      const { name, isBalanced, unitOfMeasure, quantity } = this.mqForm.value;
      const mqSteps = this.stepsTable?.getSteps();
      const body = {
        name,
        isBalanced,
        ...(!isBalanced ? { quantity: +quantity } : {}),
        unitOfMeasure: +unitOfMeasure,
        mqSteps,
      };
      if (this.mqModalActions === MqActions.CREATE) {
        if (!isStepsFull) return alert('Steps weight must be 100%');
        this.mqService.createMq(this.projectId, body).subscribe(() => this.mqService.getAllMqs(this.projectId));
      } else if (this.mqModalActions === MqActions.UPDATE) {
        this.mqService.updateMq(this.projectId, this.selectedMq.mqId, body).subscribe(() => this.mqService.getAllMqs(this.projectId));
      }
      this.closeMqDialog();
    } else {
      this.mqForm.markAllAsTouched();
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
  }
}

const gridColumns: any[] = [
  { field: 'mqId', visible: false, isPrimaryKey: true },
  { field: 'name', headerText: word('NAME'), width: 100 },
  { field: 'isBalanced', headerText: word('IS_BALANCED'), width: 100 },
  { field: 'quantity', headerText: word('QUANTITY'), width: 100 },
  { field: 'unitOfMeasure', headerText: word('UNIT_OF_MEASURE'), width: 100 },
];
