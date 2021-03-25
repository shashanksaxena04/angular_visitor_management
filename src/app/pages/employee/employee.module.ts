import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [AddEmployeeComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    SharedModule
  ]
})
export class EmployeeModule { }
