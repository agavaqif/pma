import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ProjectService } from 'src/app/core/services/project.service';

import { word } from 'src/app/core/utils/words';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  word = word;

  // Modal
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef;
  public targetEl: HTMLElement;
  public btns: object[];
  public initTarget = () => (this.targetEl = this.container?.nativeElement?.parentElement);
  public initBtns = () =>
    (this.btns = [
      { click: this.onCreateProject.bind(this), buttonModel: { content: 'Create', isPrimary: true } },
      { click: this.closeModal.bind(this), buttonModel: { content: 'Cancel' } },
    ]);

  public openModal(): void {
    this.initForm();
    this.ejDialog?.show();
  }

  public closeModal(): void {
    this.ejDialog?.hide();
  }

  // Form
  public projectForm: FormGroup;
  public initForm = () => (this.projectForm = new FormGroup({ name: new FormControl('', [Validators.required]) }));

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.initTarget();
    this.initForm();
    this.initBtns();
  }

  onCreateProject(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe((project) => {
        this.projectService.getProjects();
        this.closeModal();
        this.router.navigate(['project-wizard']);
      });
    } else {
      this.projectForm.markAllAsTouched();
    }
  }
}
