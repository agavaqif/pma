import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { generateGUID } from 'src/app/core/utils/guid';

import { word } from 'src/app/core/utils/words';
import { IMqStep } from 'src/app/shared/interfaces/mq-step.interface';
import { IGridStep, IStepLists, StepState } from '../../types/mq-step-types';

@Component({
  selector: 'app-mq-steps-table',
  templateUrl: './mq-steps-table.component.html',
  styleUrls: ['./mq-steps-table.component.scss'],
})
export class MqStepsTableComponent implements OnInit {
  @Input() isDraggable: boolean = false;
  @Input() gridSteps: IGridStep[] = [];

  public action: StepState = null;
  public actions = StepState;
  public deleteList: number[] = [];

  getStepsLists(): IStepLists {
    const updateList: Partial<IMqStep>[] = [];
    const createList: Partial<IMqStep>[] = [];

    this.getSteps().forEach(({ stepId, guid, order, title, weight, state }) => {
      if (state === StepState.CREATED) {
        createList.push({ order, title, weight });
      } else if (state === StepState.UPDATED || state === StepState.LOADED) {
        updateList.push({ stepId, order, title, weight });
      }
    });

    return { updateList, createList, deleteList: this.deleteList };
  }

  getSteps() {
    const steps = this.grid.getRowsObject().map(({ data }, index) => ({ ...data, order: index + 1 }));
    return steps as IGridStep[];
  }

  isWeightFull() {
    return this.gridSteps.reduce((acc, { weight }) => acc + weight, 0) >= 100;
  }

  // Grid
  @ViewChild('grid') grid: GridComponent;
  public selectOptions: Object;
  public rowDropOptions: object;

  public selectedStep: IGridStep = null;

  rowDrop(args: any) {
    args.cancel = true;
    var value = [];
    for (var r = 0; r < args.rows.length; r++) {
      value.push(args.fromIndex + r);
    }
    this.grid.reorderRows(value, args.dropIndex);
  }

  refreshGrid() {
    this.grid?.refresh();
  }

  rowSelected() {
    this.selectedStep = this.grid?.getSelectedRecords()[0] as IGridStep;
  }

  rowDeselected() {
    this.selectedStep = null;
  }

  clearSelection() {
    this.grid?.clearSelection();
  }

  // Toolbar
  toolbarClick(action: StepState = StepState.CREATED) {
    this.action = action;
    this.openModal();
  }

  // Modal
  @ViewChild('stepDialog') stepDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns() {
    this.btns = [
      { click: this.onSave.bind(this), buttonModel: { content: 'Save', isPrimary: true } },
      { click: this.closeModal.bind(this), buttonModel: { content: 'Cancel' } },
    ];
  }

  public openModal(): void {
    this.initForm();
    this.stepDialog?.show();
  }

  public closeModal(): void {
    this.clearAll();
    this.stepDialog?.hide();
  }

  public clearAll() {
    this.stepForm.reset();
    this.action = null;
    this.selectedStep = null;
    this.clearSelection();
    this.refreshGrid();
  }

  // Form
  public stepForm: FormGroup;
  public initForm() {
    const { title, weight, state } = this.selectedStep || {};
    this.stepForm = new FormGroup({
      title: new FormControl(this.action === StepState.CREATED ? '' : title, [Validators.required]),
      weight: new FormControl(this.action === StepState.CREATED ? '' : weight, [Validators.required]),
      state: new FormControl(this.action === StepState.CREATED ? StepState.CREATED : state),
    });
  }

  removeStep() {
    if ([StepState.LOADED, StepState.UPDATED].includes(this.selectedStep.state)) this.deleteList.push(this.selectedStep.stepId);
    this.gridSteps = this.gridSteps.filter(({ guid }) => guid !== this.selectedStep.guid);
    this.clearAll();
  }

  addStep() {
    const guid = generateGUID();
    const { title, weight } = this.stepForm.value;
    const order = this.gridSteps.length + 1;
    const state = StepState.CREATED;
    const newStep: IGridStep = { guid, order, title, weight: +weight, state };
    this.gridSteps.push(newStep);
    this.refreshGrid();
  }

  updateStep() {
    const { title, weight, state } = this.stepForm.value;
    const { guid, order, stepId } = this.selectedStep;
    const newStep: IGridStep = { guid, order, title, weight: +weight, state, stepId };
    this.gridSteps = this.gridSteps.map((step) => (step.guid === guid ? newStep : step));
    this.refreshGrid();
  }

  public onSave() {
    if (this.stepForm.valid) {
      const { state } = this.stepForm.value;
      if (this.action === StepState.CREATED) {
        this.addStep();
      } else if (this.action === StepState.UPDATED) {
        if (state === StepState.LOADED) this.stepForm.patchValue({ state: StepState.UPDATED });
        this.updateStep();
      }
      this.closeModal();
    } else {
      this.stepForm.markAllAsTouched();
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.selectOptions = { type: 'Single' };
    this.rowDropOptions = { targetID: 'Grid' };
    this.initTarget();
    this.initForm();
    this.initBtns();
  }

  word = word;
}
