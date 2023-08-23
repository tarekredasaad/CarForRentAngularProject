import { Component , Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap ,Router} from '@angular/router';
import { Order } from 'src/app/Models/Order';
import { CarDTO } from '../Models/CarDTO';
import { CarService } from '../Services/car.service';

@Component({
  selector: 'app-detailcar',
  templateUrl: './detailcar.component.html',
  styleUrls: ['./detailcar.component.scss']
})
export class DetailcarComponent implements OnInit {
  item:any
  constructor(private fb: FormBuilder,private CarServices:CarService
    ,private activatedRoute:ActivatedRoute,
    private Router:Router){

    

  }
  ngOnInit(): void {
    this.initForm()
    this.getCars()
    this.updatePage();

 
  }
  cars:any[]=[]
  pagedCars: any[] = []; // Array to hold the cars for the current page
  currentPage = 1

  updatePage() {
    this.pagedCars = this.cars.slice((this.currentPage - 1) * 2, this.currentPage * 6);
  }

  // Callback for page change event
  pageChanged(page: number) {
    this.currentPage = page;
    this.updatePage();
  }
  getCars(){
    
    
    var temp =localStorage.getItem("cars")
    // this.cars = JSON.parse() temp;
    console.log(temp)
    if (temp) {
      const storedArray = JSON.parse(temp);
      console.log(storedArray); 
      this.cars = storedArray
      this.cars = this.cars.map(car => ({ ...car, selected: false }));
      console.log(this.cars)
     }
    }
 
  remove(i:any){
    var card = document.getElementById(i)
    card?.classList.add("d-none");// = "d-none";
  }
  carForm!:FormGroup
  
  car!:CarDTO
  year:any
  power:any
  name:any
  
  
  private initForm() {
    this.carForm = this.fb.group({
      CarName: ['', [Validators.required, Validators.minLength(4)]],
      Quantity: ["",[ Validators.required ]], 
       
       RentTo: [null, Validators.required],
       Rentfrom: [null, Validators.required],
      // Other form controls can be added here
    });
  }

  get CarName() {
    return this.carForm.get('CarName');
  }
  get Quantity() {
    return this.carForm.get('Quantity');
  }
  get Rentfrom() {
    return this.carForm.get('Rentfrom');
  }
  get RentTo() {
    return this.carForm.get('RentTo');
  }
  deleteSelectedRecords() {
    this.cars = this.cars.filter(car => !car.selected)
    console.log(this.cars)
  }
  AddRecords(){
    this.Router.navigate(["car"])

  }
  
  @Input()
   Order!: any ;
  // order!:Order
  onSubmit(): void {
    
    if (this.carForm.valid) {
      // Handle form submission here
      console.log(this.carForm.value); // Form data
      console.log(this.Order)
    
    }
    
    console.log(this.Order)
    // this.Router.navigate(['/detail']);
  }
  CarsForRent:any[]=[]
  Pay(){
    this.CarsForRent = this.cars.filter(car => car.quantity !== undefined
       && car.rentTo !== undefined && car.rentFrom !== undefined);

    console.log(this.CarsForRent)
    console.log(this.cars.filter(car => car.quantity != undefined
      && car.rentTo != undefined && car.rentFrom != undefined))
      localStorage.setItem("carsForRent", JSON.stringify(this.CarsForRent));
      this.Router.navigate(["master"])


  }
}
