import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { CurrentPackageComponent } from './current-package/current-package.component';

const routes: Routes = [
    
  { path: '', component: PackageListComponent },
  {path: 'add-package', component: AddPackageComponent},
  {path: 'edit-package/:id', component: AddPackageComponent},
  {path: 'current-package', component: CurrentPackageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
