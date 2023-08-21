import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { DetailcarComponent } from './detailcar/detailcar.component';
import { MastercarComponent } from './mastercar/mastercar.component';

const routes: Routes = [
  {path: 'car',component:CarListComponent},
  {path: 'detail',component:DetailcarComponent},
  {path: 'detail/:item',component:DetailcarComponent},
  {path: 'master',component:MastercarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
