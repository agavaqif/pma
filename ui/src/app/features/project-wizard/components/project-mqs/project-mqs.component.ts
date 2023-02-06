import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

import { mqUnits } from 'src/app/shared/enums/mq-unit.enum';
import { word } from 'src/app/core/utils/words';
import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { MqService } from 'src/app/core/services/mq.service';
import { IMqStep } from 'src/app/shared/interfaces/mq-step.interface';
import { MqStepsTableComponent } from '../mq-steps-table/mq-steps-table.component';
import { IGridStep, StepState } from '../../types/mq-step-types';
import { generateGUID } from 'src/app/core/utils/guid';

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

  // Steps Table
  @ViewChild('stepsTable') stepsTable: MqStepsTableComponent;
  selectedMq: IMq;
  public gridSteps: IGridStep[] = [];

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

  public setGridSteps(steps: IMqStep[]) {
    this.gridSteps = steps.map((step) => ({ ...step, state: StepState.LOADED, guid: generateGUID() }));
  }

  // Forms
  public mqForm: FormGroup;
  public addedSteps: Partial<IMqStep>[] = [];
  public initForm() {
    const { name, isBalanced, unitOfMeasure, quantity } = this.selectedMq || {};
    this.setGridSteps((this.selectedMq?.mqSteps as IMqStep[]) || []);
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

  onSubmit() {
    const stepsList = this.stepsTable?.getStepsLists();
    const isWeightFull = this.stepsTable?.isWeightFull();
    console.log({ stepsList });
    if (this.mqForm.valid) {
      const { name, isBalanced, unitOfMeasure, quantity } = this.mqForm.value;
      const body = {
        name,
        isBalanced,
        ...(!isBalanced ? { quantity: +quantity } : {}),
        unitOfMeasure: +unitOfMeasure,
        ...(this.mqModalActions === MqActions.UPDATE ? { stepsList } : { mqSteps: stepsList.createList }),
      };
      if (!isWeightFull) return alert('Steps weight must be 100%');
      if (this.mqModalActions === MqActions.CREATE) {
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
    return +this.route.parent.snapshot.paramMap.get('projectId');
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
