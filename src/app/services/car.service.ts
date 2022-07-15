import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Car, CarResponse } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  carsList: BehaviorSubject<Car[]>;
  isCarsListEmpty: BehaviorSubject<boolean>;

  URL: string = 'https://challenge-d3-server.herokuapp.com/api/cars/';

  constructor(private http: HttpClient) {
    this.carsList = new BehaviorSubject<Car[]>([]);
    this.isCarsListEmpty = new BehaviorSubject<boolean>(true);
  }

  getCars(): Observable<CarResponse> {
    return this.http.get<CarResponse>(this.URL);
  }

  addNewCar(car:Car): Observable<any> {
    const body = car;
    return this.http.post(this.URL, body);
  }

  modifyCar(car: Car): Observable<any> {
    const body = {...car}
    return this.http.put(this.URL + car._id, body);
  }

  removeCar(carID: string): Observable<any> {
    return this.http.delete(this.URL + carID);
  }
}
