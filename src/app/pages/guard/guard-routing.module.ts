import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGuardComponent } from './add-guard/add-guard.component';
import { GuardListComponent } from './guard-list/guard-list.component';

const routes: Routes = [
  { path: '', component: GuardListComponent },
  {path: 'add-guard', component: AddGuardComponent},
  {path: 'edit-guard/:id', component: AddGuardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardRoutingModule { }
