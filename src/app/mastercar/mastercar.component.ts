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

  // @ViewChild(DetailcarComponent)child:DetailcarComponent | undefined;
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
  CarsForRent:any[]=[]
  constructor(private fb: FormBuilder,
    private Router:Router,private orderService:OrderService){}
  // detail:DetailComponent = new DetailComponent()
  ngOnInit(): void {
    // console.log(this.order)
    this.initForm();
    this.GetCarsForRent()
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
  
  GetCarsForRent()
  {
    var temp =localStorage.getItem("carsForRent")
    if (temp) {
      const storedArray = JSON.parse(temp);
      console.log(storedArray); 
      this.CarsForRent = storedArray
    }
    //fire event to hold data
    // this.childEvent.emit(this.order);
  }
  ngAfterViewInit()
  {
    // this.child?.Order;
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
  result :any
 async onSubmit() {
    // this.cars = this.cars.map(car => ({ ...car, selected: false }));

    if (this.customerForm.valid) {
      // Handle form submission here
      console.log(this.customerForm.value); // Form data
      this.orderService.formOrder = this.customerForm.value;
      console.log(this.CarsForRent)
      await this.orderService.addOrder(this.customerForm.value).subscribe(response => {
        this.result = response
        console.log(this.result.result.id)
        this.CarsForRent = this.CarsForRent.map(car => { car.orderId = this.result.result.id 
          ,console.log(car.orderId)});
          console.log(this.CarsForRent)
          console.log('Response from server:', response)
        },  
        err=> {console.log(err)});
        
        for(let car of this.CarsForRent){
       setTimeout(  async ()=>{

             this.orderService.addCars(car).subscribe(res => 
               console.log(res))
          },1200)
        }
      }
    
  }

    // this.Router.navigate(['/detail']);
  
}
