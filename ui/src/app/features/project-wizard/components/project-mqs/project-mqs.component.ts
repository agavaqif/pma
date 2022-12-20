import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { mqUnits } from 'src/app/shared/enums/mq-unit.enum';
import { word } from 'src/app/core/utils/words';
import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { MqService } from 'src/app/core/services/mq.service';

@Component({
  selector: 'app-project-mqs',
  templateUrl: './project-mqs.component.html',
  styleUrls: ['./project-mqs.component.scss'],
})
export class ProjectMqsComponent implements OnInit {
  mqs: IMq[];

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
  public mqForm: FormGroup;
  public initForm() {
    this.mqForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      isBalanced: new FormControl(false),
      unitOfMeasure: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  onSubmit() {
    if (this.mqForm.valid) {
      this.closeModal();
      const { name, isBalanced, unitOfMeasure } = this.mqForm.value;
      this.mqService
        .createMq(this.projectId, {
          name,
          isBalanced,
          unitOfMeasure: +unitOfMeasure,
        })
        .subscribe(() => this.mqService.getAllMqs(this.projectId));
    } else {
      this.mqForm.markAllAsTouched();
    }
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
