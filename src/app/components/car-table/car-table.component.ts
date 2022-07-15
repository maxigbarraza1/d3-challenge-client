import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { NewCarDialogComponent } from '../new-car-dialog/new-car-dialog.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.sass'],
})
export class CarTableComponent implements OnInit {
  carsList: Car[] = [];

  displayedColumns: string[] = ['brand', 'model', 'color', 'patent', 'actions'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource(this.carsList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private carService: CarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carService.carsList.subscribe((cars) => {
      this.carsList = cars;
      this.carsList.length >= 1
        ? this.carService.isCarsListEmpty.next(false)
        : this.carService.isCarsListEmpty.next(true);
      this.dataSource = new MatTableDataSource(this.carsList);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCar(carID: string) {
    const car = this.carsList.find((car) => car._id === carID);
    if (car) {
      this.carService.removeCar(car._id!).subscribe((data) => {
        this.carsList.splice(
          this.carsList.map((car) => car._id).indexOf(carID),
          1
        );
        this.carsList.length >= 1
          ? this.carService.isCarsListEmpty.next(false)
          : this.carService.isCarsListEmpty.next(true);
        this.carService.carsList.next(this.carsList);
      });
    }
  }

  showDeleteAlert(car:Car):void{
    Swal.fire({
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCar(car._id!);
        Swal.fire('Deleted!', 'Car selected has been deleted.', 'success');
      }
    });
  }

  openDialog(car: Car): void {
    this.dialog.open(NewCarDialogComponent, {
      width: '400px',
      data: {
        car,
      },
    });
  }
}
