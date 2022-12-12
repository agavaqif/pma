import { word } from './../../../../core/utils/words';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ExecTypesService } from 'src/app/core/services/exec-types.service';
import { IExecType } from 'src/app/shared/interfaces/exec-type.interface';

@Component({
  selector: 'app-project-exec-types',
  templateUrl: './project-exec-types.component.html',
  styleUrls: ['./project-exec-types.component.scss'],
})
export class ProjectExecTypesComponent implements OnInit {
  execTypes: IExecType[];

  // Modal
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns() {
    this.btns = [
      { click: this.onSubmit.bind(this), buttonModel: { content: 'Create', isPrimary: true } },
      { click: this.closeModal.bind(this), buttonModel: { content: 'Cancel' } },
    ];
  }

  public openModal(): void {
    this.initForm();
    this.ejDialog?.show();
  }

  public closeModal(): void {
    this.ejDialog?.hide();
  }

  // Forms
  public execTypeForm: FormGroup;
  public initForm() {
    this.execTypeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    });
  }

  onSubmit() {
    if (this.execTypeForm.valid) {
      this.closeModal();
      this.execTypeService.createExecType(this.projectId, this.execTypeForm.value).subscribe(() => this.execTypeService.getExecTypesByProjectId(this.projectId));
    } else {
      this.execTypeForm.markAllAsTouched();
    }
  }

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  word = word;

  constructor(private execTypeService: ExecTypesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.execTypeService.onExecTypes().subscribe((execTypes) => (this.execTypes = execTypes));
    this.execTypeService.getExecTypesByProjectId(this.projectId);
    this.initTarget();
    this.initForm();
    this.initBtns();
  }
}
