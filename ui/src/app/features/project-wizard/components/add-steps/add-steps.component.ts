import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { word } from 'src/app/core/utils/words';
import { IMqStep } from 'src/app/shared/interfaces/mq-step.interface';

@Component({
  selector: 'app-add-steps',
  templateUrl: './add-steps.component.html',
  styleUrls: ['./add-steps.component.scss'],
})
export class AddStepsComponent implements OnInit {
  @Output() onAddStep: EventEmitter<Partial<IMqStep>> = new EventEmitter();

  // Modal
  @ViewChild('stepDialog') stepDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns() {
    this.btns = [
      { click: this.onSubmit.bind(this), buttonModel: { content: 'Save', isPrimary: true } },
      { click: this.closeModal.bind(this), buttonModel: { content: 'Cancel' } },
    ];
  }

  public openModal(): void {
    this.initForm();
    this.stepDialog?.show();
  }

  public closeModal(): void {
    this.stepForm.reset();
    this.stepDialog?.hide();
  }

  // Forms
  public stepForm: FormGroup;
  public initForm() {
    this.stepForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.stepForm.valid) {
      const { title, weight } = this.stepForm.value;
      this.onAddStep.emit({ title, weight: +weight });
      this.closeModal();
    } else {
      this.stepForm.markAllAsTouched();
    }
  }
  word = word;

  constructor() {}

  ngOnInit(): void {
    this.initTarget();
    this.initForm();
    this.initBtns();
  }
}
