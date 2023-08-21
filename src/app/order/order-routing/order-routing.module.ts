import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
// import { DetailComponent } from '../detail/detail.component';
// import { MasterComponent } from '../master/master.component';

const routes: Routes = [
// {path: 'detail',component:DetailComponent},
//   {path: 'master',component:MasterComponent},
];
@NgModule({
  // imports: [RouterModule.forChild(routes)],
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
