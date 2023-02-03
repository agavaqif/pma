import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutManagerRoutingModule } from './layout-manager-routing.module';
import { LayoutManagerComponent } from './layout-manager.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, LayoutManagerComponent],
  imports: [LayoutManagerRoutingModule, SharedModule, CommonModule],
})
export class LayoutManagerModule {}
