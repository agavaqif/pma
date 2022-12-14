import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
