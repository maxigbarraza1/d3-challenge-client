import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  showDeleteAlert(car: Car): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Are you sure?',
      html:
        `<strong>You trying to delete</strong> <br>` +
        `Car: <b>${car.brand} ${car.model}</b> <br>` +
        `Patent: <b>${car.patent}</b> <br>` +
        `Color: <b>${car.color}</b> <br>` +
        `<p>You won't be able to revert this</p>`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  }

  showSucessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  showErrorAlert(message:string): void{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}
