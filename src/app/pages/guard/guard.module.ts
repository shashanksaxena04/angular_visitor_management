import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardRoutingModule } from './guard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddGuardComponent } from './add-guard/add-guard.component';
import { GuardListComponent } from './guard-list/guard-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [AddGuardComponent, GuardListComponent],
  imports: [
    CommonModule,
    GuardRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    SharedModule
  ]
})
export class GuardModule { }
