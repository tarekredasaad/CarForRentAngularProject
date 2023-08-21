import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../Models/Car';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }
  private dataSubject = new BehaviorSubject<any[]>([]);

  private apiCar:any = "https://localhost:44305/api/Car/GetCars";

  setData(data: any[]): void {
    this.dataSubject.next(data);
    console.log(this.dataSubject)
    console.log(data)
  }

  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  GetCars(brand:any,name:any, year:any): Observable<any[]> {
    let queryParams = [];
  
    if (brand) queryParams.push(`brand=${brand}`);
    if (name) queryParams.push(`name=${name}`);
    if (year) queryParams.push(`year=${year}`);
  
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  
    return this.http.get<any[]>(`${this.apiCar}${queryString}`)
      .pipe(
        catchError((err: { message: any }) => throwError(() => err.message || 'server error'))
      );
  }
}
