import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DetailComponent } from './detail/detail.component';
// import { MasterComponent } from './master/master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing/order-routing.module';




@NgModule({
  declarations: [
    // DetailComponent,
    // MasterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
