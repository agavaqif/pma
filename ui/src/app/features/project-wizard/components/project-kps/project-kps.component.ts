import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

import { IKp, IKpCreate } from 'src/app/shared/interfaces/kp.interface';
import { KpService } from 'src/app/core/services/kp.service';
import { word } from 'src/app/core/utils/words';
import { KpUnit, kpUnits } from 'src/app/shared/enums/kp-unit.enum';
import { ExecTypesService } from 'src/app/core/services/exec-types.service';

@Component({
  selector: 'app-project-kps',
  templateUrl: './project-kps.component.html',
  styleUrls: ['./project-kps.component.scss'],
})
export class ProjectKpsComponent implements OnInit {
  public projectKps: IKp[];

  kpUnits = Object.entries(kpUnits).map((kpUnit) => ({ value: kpUnit[0], text: kpUnit[1] }));
  execTypes: any[];
  word = word;

  constructor(private kpService: KpService, private route: ActivatedRoute, private execTypesService: ExecTypesService) {}

  get projectId() {
    return +this.route.snapshot.paramMap.get('projectId');
  }

  ngOnInit(): void {
    this.kpService.onKps().subscribe((kps) => (this.projectKps = kps));
    this.kpService.getKpsByProjectId(this.projectId);
    this.execTypesService.onExecTypes().subscribe((execTypes) => (this.execTypes = execTypes.map((execType) => ({ value: execType.execTypeId, text: execType.name }))));
    this.execTypesService.getExecTypesByProjectId(this.projectId);
    this.initTarget();
    this.initForm();
    this.initBtns();
  }

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
  public kpForm: FormGroup;
  public initForm() {
    this.kpForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      kpUnit: new FormControl('', [Validators.required]),
      accuracy: new FormControl('', [Validators.required]),
      execType: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.kpForm.valid) {
      const kp: IKpCreate = {
        start: +this.kpForm.value.start,
        end: +this.kpForm.value.end,
        kpUnit: +this.kpForm.value.kpUnit,
        accuracy: +this.kpForm.value.accuracy,
        execTypeId: +this.kpForm.value.execType,
      };
      this.kpService.createKp(this.projectId, kp).subscribe((kp) => this.kpService.getKpsByProjectId(this.projectId));
      this.closeModal();
    } else {
      this.kpForm.markAllAsTouched();
    }
  }
}
