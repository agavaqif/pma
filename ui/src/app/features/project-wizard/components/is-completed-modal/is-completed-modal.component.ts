import { IisCompleted } from 'src/app/shared/interfaces/is-completed.interface';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { word } from 'src/app/core/utils/words';

@Component({
  selector: 'app-is-completed-modal',
  templateUrl: './is-completed-modal.component.html',
  styleUrls: ['./is-completed-modal.component.scss'],
})
export class IsCompletedModalComponent implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter();

  public data: IisCompleted = null;

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
    if (type === 'complete') {
      this.initBtns();
      this.initForm();
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
        crew: new FormControl(crew.name),
        date: new FormControl(new Date(+completedDate)),
        note: new FormControl(stepNote.note),
      });
      return;
    }
    this.stepForm = new FormGroup({
      crewId: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
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
        completedDate: date,
        note,
      });
      this.closeModal();
    } else {
      this.stepForm.markAllAsTouched();
    }
  }
  word = word;

  constructor() {}

  ngOnInit(): void {
    this.initTarget();
  }
}
