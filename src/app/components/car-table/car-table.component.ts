import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { NewCarDialogComponent } from '../new-car-dialog/new-car-dialog.component';

import Swal from 'sweetalert2';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.sass'],
})
export class CarTableComponent implements OnInit, OnDestroy {

  carsList: Car[] = [];

  suscriptions!:Subscription;

  displayedColumns: string[] = ['brand', 'model', 'color', 'patent', 'actions'];
  dataSource: MatTableDataSource<Car> = new MatTableDataSource(this.carsList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(  private carService: CarService,
                private notifService: NotificationsService,
                private dialog: MatDialog) {}

  ngOnInit(): void {
    this.suscriptions = this.carService.carsList.subscribe((cars) => {
      this.carsList = cars;
      this.carsList.length >= 1
        ? this.carService.isCarsListEmpty.next(false)
        : this.carService.isCarsListEmpty.next(true);
      this.dataSource = new MatTableDataSource(this.carsList);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  deleteCar(carID: string) {
    const car = this.carsList.find((car) => car._id === carID);
    if (car) {
      this.suscriptions.add(
        this.carService.removeCar(car._id!).subscribe((data) => {
          this.carsList.splice(
            this.carsList.map((car) => car._id).indexOf(carID),
            1
          );
          this.carsList.length >= 1
            ? this.carService.isCarsListEmpty.next(false)
            : this.carService.isCarsListEmpty.next(true);
          this.carService.carsList.next(this.carsList);
        })
      )
    }
  }

  showDeleteAlert(car:Car):void{
    this.notifService.showDeleteAlert(car).then((result) => {
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
