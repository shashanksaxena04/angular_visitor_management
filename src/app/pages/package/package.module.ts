import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PackageRoutingModule } from './package-routing.module';
import { PackageListComponent } from './package-list/package-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddPackageComponent } from './add-package/add-package.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CurrentPackageComponent } from './current-package/current-package.component';


@NgModule({
  declarations: [PackageListComponent, AddPackageComponent, CurrentPackageComponent],
  imports: [
    CommonModule,
   // BrowserAnimationsModule, 
  //NoopAnimationsModule,
    PackageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(), 
  ]
})
export class PackageModule { }
