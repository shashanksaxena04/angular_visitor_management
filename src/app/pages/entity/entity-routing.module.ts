import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntityComponent } from './add-entity/add-entity.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityNoticeComponent } from './entity-notice/entity-notice.component';

const routes: Routes = [
  { path: '', component: EntityListComponent },
  {path: 'add-entity', component: AddEntityComponent},
  {path: 'edit-entity/:id', component: AddEntityComponent},
  {path: 'entity-notice', component: EntityNoticeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
