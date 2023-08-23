import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private http: HttpClient) { }
  formOrder!:any
  order!:any
  apiOrder:string="https://localhost:44305/api/Order/AddOrder";
  apiCars:string="https://localhost:44305/api/Order/addOrderCars";

  addOrder(form:any): Observable<any>{
    console.log(form)
    return this.http.post<any[]>(`${this.apiOrder}`,form)
    .pipe(catchError((err: { message: any; }) => {
      return throwError(() => err.message || "server error");
    }));
  }
  addCars(cars:any[]): Observable<any>{
    console.log(cars)
    return this.http.post<any[]>(`${this.apiCars}`,cars)
    .pipe(catchError((err: { message: any; }) => {
      return throwError(() => err.message || "server error");
    }));
  }
}
