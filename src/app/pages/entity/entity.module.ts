import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddEntityComponent } from './add-entity/add-entity.component';
import { EntityListComponent } from './entity-list/entity-list.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelect2Module } from 'ng-select2';
import { EntityNoticeComponent } from './entity-notice/entity-notice.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [AddEntityComponent, EntityListComponent, EntityNoticeComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(), 
    NgSelect2Module,
    

  ],
  providers:[DatePipe]
})
export class EntityModule { }
