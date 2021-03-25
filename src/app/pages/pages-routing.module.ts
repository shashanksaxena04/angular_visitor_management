import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule)},
  { path: 'entity', loadChildren: () => import('./entity/entity.module').then(m => m.EntityModule)},
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)},
  { path: 'guard', loadChildren: () => import('./guard/guard.module').then(m => m.GuardModule)},
  { path: 'visitor', loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
