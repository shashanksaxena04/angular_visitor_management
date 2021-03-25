import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [VisitorListComponent],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    SharedModule
  ]
})
export class VisitorModule { }
