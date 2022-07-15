import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCarDialogComponent } from 'src/app/components/new-car-dialog/new-car-dialog.component';
import { CarService } from 'src/app/services/car.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy{

  isCarListEmpty:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  suscriptions!:Subscription;

  constructor(private dialog: MatDialog, private carService: CarService) {}

  ngOnInit(): void {
    this.suscriptions = this.carService.getCars().subscribe(({ cars }) => {
      this.carService.carsList.next(cars);
      cars.length >= 1
        ? this.carService.isCarsListEmpty.next(false)
        : this.carService.isCarsListEmpty.next(true);
      this.isCarListEmpty = this.carService.isCarsListEmpty;
    });
  }

  ngOnDestroy():void {
    this.suscriptions.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(NewCarDialogComponent, {
      width: '400px',
    });
  }
}
