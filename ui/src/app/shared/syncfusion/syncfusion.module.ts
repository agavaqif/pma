import { NgModule } from '@angular/core';
import { SidebarModule, ToolbarAllModule, ToolbarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DiagramAllModule } from '@syncfusion/ej2-angular-diagrams';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { InPlaceEditorAllModule } from '@syncfusion/ej2-angular-inplace-editor';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';

@NgModule({
  declarations: [],
  exports: [
    ButtonAllModule,
    ChartAllModule,
    DialogAllModule,
    DiagramAllModule,
    DropDownListAllModule,
    InPlaceEditorAllModule,
    GanttAllModule,
    GridModule,
    GridAllModule,
    ListViewModule,
    SidebarModule,
    TabAllModule,
    TreeGridAllModule,
    TreeViewModule,
    ToolbarAllModule,
    ToastModule,
    TabModule,
    ToolbarModule,
    AccordionModule,
    DropDownButtonModule,
    UploaderModule,
    DatePickerModule,
    MultiSelectModule,
    TooltipModule,
    BreadcrumbModule,
    AutoCompleteModule,
    ListBoxModule,
    CheckBoxModule,
    PivotViewModule,
  ],
})
export class SyncfusionModule {}
