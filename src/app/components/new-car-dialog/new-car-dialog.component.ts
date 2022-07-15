import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-new-car-dialog',
  templateUrl: './new-car-dialog.component.html',
  styleUrls: ['./new-car-dialog.component.sass'],
})
export class NewCarDialogComponent implements OnInit, OnDestroy {

  isOpenForEdit:boolean = false;

  localCarList:Car[] = [];

  suscriptions!: Subscription;

  newCarForm: FormGroup = this.fb.group({
    brand: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    model: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    color: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    patent: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Z]{3}-[0-9]{3}$')],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private carService:CarService,
    public dialogRef: MatDialogRef<NewCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._openForm();
    this.suscriptions = this.carService.carsList.subscribe( data => {
      this.localCarList = data;
    })
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }



  private _openForm(): void{
    if (this.data) {
      const { brand, model, color, patent } = this.data.car;
      this.isOpenForEdit=true;
      this.newCarForm.reset({
        brand,
        model,
        color,
        patent,
      });
    } else {
      this.isOpenForEdit = false;
      this.newCarForm.reset({
        brand: '',
        model: '',
        color: '',
        patent: '',
      });
    }
  }

  validateFields(field: string) {
    return (
      this.newCarForm.controls[field].errors &&
      this.newCarForm.controls[field].touched
    );
  }

  saveCar() {
    if (this.newCarForm.invalid) {
      this.newCarForm.markAllAsTouched();
      return;
    }

    const newCar:Car = {...this.newCarForm.value};

    if(this.isOpenForEdit){
      newCar._id = this.data.car._id;
      const carIndex = this.localCarList.findIndex(
        (car) => car._id === newCar._id
      );
      this.suscriptions.add(
        this.carService.modifyCar(newCar).subscribe((resp) => {
          this.localCarList[carIndex] = { ...newCar };
          this.carService.carsList.next(this.localCarList);
        })
      )
    }else{
      this.suscriptions.add(
        this.carService.addNewCar(newCar).subscribe((resp) => {
          this.localCarList.push(resp.car);
          this.carService.carsList.next(this.localCarList);  
        })
      )
    }
    this.localCarList.length >= 1
      ? this.carService.isCarsListEmpty.next(false)
      : this.carService.isCarsListEmpty.next(true);
    this.newCarForm.reset();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getErrorMessage(field: string) {
    return this.newCarForm.get(field)?.hasError('required')
      ? 'The field is required'
      : this.newCarForm.get(field)?.hasError('minlength')
      ? 'The field must have at least 3 characters'
      : this.newCarForm.get(field)?.hasError('maxlength')
      ? 'The field must have a maximum of 20 characters'
      : this.newCarForm.get(field)?.hasError('pattern')
      ? 'The field must have a valid patent'
      : '';
  }
}
