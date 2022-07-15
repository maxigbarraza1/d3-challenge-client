import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCarDialogComponent } from '../new-car-dialog/new-car-dialog.component';

@Component({
  selector: 'app-empty-card',
  templateUrl: './empty-card.component.html',
  styleUrls: ['./empty-card.component.sass'],
})
export class EmptyCardComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(NewCarDialogComponent, {
      width: '400px',
    });
  }
}
