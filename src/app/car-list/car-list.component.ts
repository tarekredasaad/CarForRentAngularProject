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
  check=true
  count:number =0 ;
  push(i:any){
    var selectedCar = document.getElementById(i);
    // this.selectedValue =selectedCar?.getAttribute("ng-reflect-model");
    this.Cars[i].seleceted = true
    this.carDto ={
      id:this.Cars[i].id,
      name:this.Cars[i].model.name,
      type:this.Cars[i].model.type,
      year:this.Cars[i].year,
      power:this.Cars[i].power,
      brandId:this.Cars[i].model.brand.id,
      // quantity:0,
      // rentFrom:new Date(),
      // rentTo:new Date(),
      seleceted:selectedCar?.getAttribute("ng-reflect-model")
    }
      this.Cars[i].seleceted = selectedCar?.getAttribute("ng-reflect-model")
    console.log(this.Cars[i].id)
    console.log(this.carDto.id)
    console.log(this.carDto.seleceted)
    if(this.carDto.seleceted == "true"){
    // if(this.check == true){

      this.CarDtos.push(this.carDto);

      console.log(this.count)
    }else{
      console.log("not selected")
    }
    for(let v =0 ; v<this.CarDtos.length;v++){
      if(this.CarDtos[v].id == this.Cars[i].id){
        if(v==0 && this.count == 1){
          console.log("here")
        }
        this.count++;
      }
    }
    console.log(this.CarDtos)
    console.log(selectedCar?.getAttribute("selected"))
    console.log(selectedCar)
  }
  buy(i:any){
    this.carService.setData(this.CarDtos);
    localStorage.setItem("cars", JSON.stringify(this.CarDtos));

    this.Router.navigate(["detail"])
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
}
