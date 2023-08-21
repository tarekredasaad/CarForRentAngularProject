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

  addOrder(): Observable<any>{
    return this.http.post<any[]>(`${this.apiOrder}`,this.order)
    .pipe(catchError((err: { message: any; }) => {
      return throwError(() => err.message || "server error");
    }));
  }
}
