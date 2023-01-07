import { IisCompleted } from 'src/app/shared/interfaces/is-completed.interface';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { word } from 'src/app/core/utils/words';
import { CrewService } from 'src/app/core/services/crew.service';
import { ActivatedRoute } from '@angular/router';
import { formatDateTime } from 'src/app/core/utils/date-helpers';

@Component({
  selector: 'app-is-completed-modal',
  templateUrl: './is-completed-modal.component.html',
  styleUrls: ['./is-completed-modal.component.scss'],
})
export class IsCompletedModalComponent implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  public data: IisCompleted = null;
  public crewOptions: { value: number; text: string }[] = [];

  // Modal
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns() {
    this.btns = [
      { click: this.onSubmit.bind(this), buttonModel: { content: word('SUBMIT'), isPrimary: true } },
      { click: this.closeModal.bind(this), buttonModel: { content: word('CANCEL') } },
    ];
  }
  public actionType: 'view' | 'complete';
  public getHeader(): string {
    if (this.actionType === 'view') return word('COMPLETED_NOTE');
    return word('COMPLETE');
  }

  public openModal(type: 'view' | 'complete' = 'view'): void {
    this.actionType = type;
    this.initForm();
    if (type === 'complete') {
      this.initBtns();
    } else {
      this.btns = [];
    }
    this.ejDialog?.show();
  }

  public closeModal(): void {
    this.stepForm.reset();
    this.ejDialog?.hide();
  }

  // Forms
  public stepForm: FormGroup;
  public initForm() {
    if (this.actionType === 'view') {
      const { crew, completedDate, stepNote } = this.data;
      this.stepForm = new FormGroup({
        crew: new FormControl(crew?.name || ''),
        date: new FormControl(formatDateTime(+completedDate) || ''),
        note: new FormControl(stepNote?.note || ''),
      });
      return;
    }
    this.stepForm = new FormGroup({
      crewId: new FormControl('', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      note: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.stepForm.valid) {
      const { crewId, date, note } = this.stepForm.value;
      const { kp, mqStep } = this.data;
      this.onSave.emit({
        kpId: kp.kpId,
        stepId: mqStep.stepId,
        crewId,
        completedDate: new Date(date).getTime().toString(),
        note,
      });
      this.closeModal();
    } else {
      this.stepForm.markAllAsTouched();
    }
  }
  word = word;

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  constructor(private crewService: CrewService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initTarget();
    this.initBtns();

    this.crewService.onCrews().subscribe((crews) => (this.crewOptions = crews.map(({ crewId, name }) => ({ value: crewId, text: name }))));
    this.crewService.getAllCrews(this.projectId);
  }
}
