import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { confirmDelete, word } from 'src/app/core/utils/words';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { IToolbarBtn, ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { ExecTypesService } from 'src/app/core/services/exec-types.service';
import { IExecType } from 'src/app/shared/interfaces/exec-type.interface';

enum ExecTypeActions {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Component({
  selector: 'app-project-exec-types',
  templateUrl: './project-exec-types.component.html',
  styleUrls: ['./project-exec-types.component.scss'],
})
export class ProjectExecTypesComponent implements OnInit {
  public execTypes: IExecType[];
  public selectedExecType: IExecType = null;

  @ViewChild('kpTableToolbar') kpTableToolbar: ToolbarComponent;
  @ViewChild('kpTable') kpTable: TableComponent;

  public tableColumns = tableColumns;
  public toolbarBtns: IToolbarBtn[] = [
    {
      text: word('UPDATE'),
      prefixIcon: 'e-edit',
      id: 'update',
      align: 'right',
      disabled: this.isDisabled.bind(this, 'update'),
    },
    {
      text: word('DELETE'),
      prefixIcon: 'e-delete',
      id: 'delete',
      align: 'right',
      disabled: this.isDisabled.bind(this, 'delete'),
    },
  ];

  public onToolbarBtnClick = (action: ExecTypeActions) => {
    this.action = action;
    switch (action) {
      case 'update':
        this.openModal(ExecTypeActions.UPDATE);
        break;
      case 'delete':
        this.openModal(ExecTypeActions.DELETE);
        break;
    }
  };

  public updateToolbarBtns = () => {
    this.kpTableToolbar.btns = this.toolbarBtns.map((btn) => ({
      ...btn,
      disabled: typeof btn.disabled === 'function' ? btn.disabled() : btn.disabled,
    }));
  };

  public onSetRecord = (record: IExecType) => {
    this.selectedExecType = record;
    this.updateToolbarBtns();
  };

  public isDisabled(action: 'update' | 'delete') {
    switch (action) {
      case 'update':
        return !this.selectedExecType;
      case 'delete':
        return !this.selectedExecType || this.selectedExecType.isDefault;
    }
  }

  // Modal
  @ViewChild('ejDialog')
  ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public modalBtns: object[];
  public modalHeader: string = word('CREATE_EXEC_TYPE');
  public deleteContent: string;
  public action: ExecTypeActions = null;
  public execTypeActions = ExecTypeActions;

  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);

  getModalHeader() {
    switch (this.action) {
      case 'update':
        return word('UPDATE_EXEC_TYPE');
      case 'delete':
        return word('DELETE_EXEC_TYPE');
    }
    return word('CREATE_EXEC_TYPE');
  }

  getDeleteContent() {
    return confirmDelete(word('EXEC_TYPE'), this.selectedExecType?.name);
  }

  public openModal(action: ExecTypeActions): void {
    this.action = action;
    this.initForm();
    this.ejDialog?.show();
  }

  public closeModal(): void {
    this.selectedExecType = null;
    this.action = null;
    this.execTypeForm.reset();
    this.ejDialog?.hide();
    this.kpTable?.refreshGrid();
  }

  // Forms
  public execTypeForm: FormGroup;
  public initForm() {
    const { name, code } = this.selectedExecType || {};
    switch (this.action) {
      case 'update':
        return (this.execTypeForm = new FormGroup({
          name: new FormControl(name, [Validators.required, Validators.maxLength(50)]),
          code: new FormControl(code, [Validators.required, Validators.maxLength(6)]),
        }));
      case 'delete':
        return (this.execTypeForm = new FormGroup({}));
    }
    return (this.execTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    }));
  }

  onSubmit() {
    if (this.execTypeForm.valid) {
      switch (this.action) {
        case 'create':
          this.execTypeService.createExecType(this.projectId, this.execTypeForm.value).subscribe(() => this.execTypeService.getExecTypesByProjectId(this.projectId));
          break;
        case 'update':
          this.execTypeService.updateExecType(this.projectId, this.selectedExecType.execTypeId, this.execTypeForm.value).subscribe(() => this.execTypeService.getExecTypesByProjectId(this.projectId));
          break;
      }
      this.closeModal();
    } else {
      this.execTypeForm.markAllAsTouched();
    }
  }

  onDelete() {
    this.execTypeService.deleteExecType(this.projectId, this.selectedExecType.execTypeId).subscribe(() => this.execTypeService.getExecTypesByProjectId(this.projectId));
    this.closeModal();
  }

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  word = word;

  constructor(private execTypeService: ExecTypesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.execTypeService.onExecTypes().subscribe((execTypes) => {
      this.execTypes = execTypes;
      this.kpTable.refreshGrid();
    });
    this.execTypeService.getExecTypesByProjectId(this.projectId);
    this.initTarget();
    this.initForm();
  }
}

const tableColumns = [
  { field: 'execTypeId', visible: false, isPrimaryKey: true },
  { field: 'name', headerText: word('NAME'), width: 100, textAlign: 'Left' },
  { field: 'code', headerText: word('CODE'), width: 100, textAlign: 'Left' },
];
