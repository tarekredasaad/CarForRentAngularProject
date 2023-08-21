import { Component ,EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/Models/Order';
import { Route, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { DetailcarComponent } from '../detailcar/detailcar.component';
@Component({
  selector: 'app-mastercar',
  templateUrl: './mastercar.component.html',
  styleUrls: ['./mastercar.component.scss']
})
export class MastercarComponent implements OnInit{
  // @ViewChild(ChildComponent) child: ChildComponent;

  @ViewChild(DetailcarComponent)child:DetailcarComponent | undefined;
  myForm!: FormGroup
  // order:Order={
  //   customerName:"",
  //   customerNationality:"",
  //   drivingLicense:"",
  //   carName:"",
  //   quantity:0,
  //   advancedPayment:"",
  //   rentFrom:new Date,
  //   rentTo:new Date,
  //   transactionDate:new Date
  // }
  bad:string="bad"
  constructor(private fb: FormBuilder,
    private Router:Router,private orderService:OrderService){}
  // detail:DetailComponent = new DetailComponent()
  ngOnInit(): void {
    // console.log(this.order)
    this.initForm();
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(4)]],
       drivingLicense: ["",[ Validators.required ,Validators.minLength(3)
        ,Validators.maxLength(15)]], 
        advancedPayment: ["",[ Validators.required ,Validators.minLength(3)
        ,Validators.maxLength(15)]], 
        Nationality: [null, Validators.required],
        transactionDate: [null, Validators.required],
      // Other form controls can be added here
    });
    // this.createForm()
  }
  
  GetData()
  {
    //fire event to hold data
    // this.childEvent.emit(this.order);
  }
  ngAfterViewInit()
  {
    this.child?.Order;
  }
  nationalities: string[] = [
    'USA',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Japan'
  ];

  

  get customerName() {
    return this.customerForm.get('customerName');
  }
  get drivingLicense() {
    return this.customerForm.get('drivingLicense');
  }
  get advancedPayment() {
    return this.customerForm.get('advancedPayment');
  }
  get Nationality() {
    return this.customerForm.get('Nationality');
  }
  get transactionDate() {
    return this.customerForm.get('transactionDate');
  }

  customerForm!: FormGroup;

  private initForm() {
    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(4)]],
       drivingLicense: ["",[ Validators.required ,Validators.minLength(3)
        ,Validators.maxLength(15)]], 
        advancedPayment: ["",[ Validators.required ,Validators.minLength(3)
        ,Validators.maxLength(15)]], 
        Nationality: [null, Validators.required],
        transactionDate: [null, Validators.required],
      // Other form controls can be added here
    });
  }

  onSubmit() {
    
    if (this.customerForm.valid) {
      // Handle form submission here
      console.log(this.customerForm.value); // Form data
      this.orderService.formOrder = this.customerForm.value;
    }

    this.Router.navigate(['/detail']);
  }
}
