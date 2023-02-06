import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Subscription } from 'rxjs';

import { IMq } from 'src/app/shared/interfaces/mq.interface';
import { CrewService } from 'src/app/core/services/crew.service';
import { ICrew } from 'src/app/shared/interfaces/crew.interface';
import { word } from 'src/app/core/utils/words';
import { MqService } from 'src/app/core/services/mq.service';

@Component({
  selector: 'app-project-crews',
  templateUrl: './project-crews.component.html',
  styleUrls: ['./project-crews.component.scss'],
})
export class ProjectCrewsComponent implements OnInit {
  crews: ICrew[];
  mqs: { value: number; text: string }[] = [];
  word = word;

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
    this.onStartDateChange();
    this.onEndDateChange();
  }

  public closeModal(): void {
    this.crewForm.reset();
    this.ejDialog?.hide();
    this.onStartDate.unsubscribe();
    this.onEndDate.unsubscribe();
    this.maxStartDate = null;
    this.minEndDate = null;
  }

  // Forms
  public crewForm: FormGroup;
  public initForm() {
    this.crewForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      isActive: new FormControl(false),
      mainPerformingActivity: new FormControl('', [Validators.required]),
    });
  }

  public dateFormat: string = 'dd/MM/yyyy';
  public maxStartDate: Date = null;
  public minEndDate: Date = null;
  public onStartDate: Subscription;
  public onEndDate: Subscription;

  onStartDateChange(): void {
    this.onStartDate = this.crewForm.get('startDate').valueChanges.subscribe((value) => {
      this.maxStartDate = value;
      this.minEndDate = value;
    });
  }

  onEndDateChange(): void {
    this.onEndDate = this.crewForm.get('endDate').valueChanges.subscribe((value) => (this.minEndDate = value));
  }

  get startDate() {
    return this.crewForm?.get('startDate');
  }

  get endDate() {
    return this.crewForm?.get('endDate');
  }

  onSubmit() {
    if (this.crewForm.valid) {
      const { name, startDate, endDate, isActive, mainPerformingActivity } = this.crewForm.value;
      this.crewService
        .createCrew(this.projectId, {
          name,
          startDate: startDate ? startDate.getTime() : null,
          endDate: endDate ? endDate.getTime() : null,
          isActive,
          mqId: mainPerformingActivity,
        })
        .subscribe(() => this.crewService.getAllCrews(this.projectId));
      this.closeModal();
    } else {
      this.crewForm.markAllAsTouched();
    }
  }

  get projectId() {
    return +this.route.parent.snapshot.paramMap.get('projectId');
  }

  constructor(private route: ActivatedRoute, private crewService: CrewService, private mqService: MqService) {}

  ngOnInit(): void {
    this.crewService.onCrews().subscribe((crews) => (this.crews = crews));
    this.crewService.getAllCrews(this.projectId);
    this.mqService.onMqs().subscribe((mqs) => (this.mqs = mqs.map(({ mqId, name }) => ({ value: mqId, text: name }))));
    this.mqService.getAllMqs(this.projectId);
    this.initTarget();
    this.initForm();
    this.initBtns();
  }
}
