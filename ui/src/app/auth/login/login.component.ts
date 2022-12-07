import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator, FormValidators } from '@syncfusion/ej2-angular-inputs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [FormValidators.required, FormValidators.email]),
      password: new FormControl(null, [FormValidators.required]),
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password);
  }
}
