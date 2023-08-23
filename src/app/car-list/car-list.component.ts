import { Component, OnInit } from '@angular/core';
import { Car } from '../Models/Car';
import { CarService } from '../Services/car.service';
import { Route, Router } from '@angular/router';
import { CarDTO } from '../Models/CarDTO';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit{
  Error: any;

  constructor(private carService:CarService,
    private Router:Router){}
    carDto!:CarDTO
    selectedValue!:boolean
    CarDtos:CarDTO[]=[]
  Cars:any[] =[]
  Carsfilter:any[] =[]
  Temp!:any
  ngOnInit(): void {
    this.ShowCars()
    console.log(this.Carsfilter)
    this.copy()
  }
  
  brandId:any
  name:any
  year:any
  SelectBrand(){
    console.log(this.brandId)
    this.ShowCars()
  }
  SelectName(){
    console.log(this.name)
    this.ShowCars()
  }
  SelectYear(){
    console.log(this.year)
    this.ShowCars()
  }
  
 
  

  ShowCars() {
    // debugger
    var temp;
    this.carService.GetCars(this.brandId,this.name,this.year).subscribe({
      next: data =>{ 
        console.log(data)
        this.Temp = data;
        temp = data;
        console.log(temp)
        console.log(this.Temp.result)
        this.Cars = this.Temp.result
        console.log(this.Cars[0].model.brand.id)
        console.log(this.Cars)
      },
      error: err => this.Error = err,
    })
    console.log(this.Cars)
  }

  copy(){
    this.carService.GetCars(null,null,null).subscribe({
      next: data =>{ 
        var temp;
        console.log(data)
        this.Temp = data;
        temp = data;
        console.log(temp)
        console.log(this.Temp.result)
        this.Carsfilter = this.Temp.result
        console.log(this.Cars[0].model.brand.id)
        console.log(this.Cars)
      },
      error: err => this.Error = err,
    })
    

  }

  

  PushSelectedRecords() {
    this.CarDtos = this.Cars.filter(car => car.selected);
    console.log(this.CarDtos)
    this.carService.setData(this.CarDtos);
    localStorage.setItem("cars", JSON.stringify(this.CarDtos));

    this.Router.navigate(["detail"])
  }
}
