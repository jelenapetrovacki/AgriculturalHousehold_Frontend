import { UpdateKategorijeComponent } from './../update-kategorije/update-kategorije.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Svinja } from 'src/app/models/svinja';
import { ArhivaVetBrDialogComponent } from '../arhiva-vet-br-dialog/arhiva-vet-br-dialog.component';

@Component({
  selector: 'app-choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.css']
})
export class ChoiceDialogComponent implements OnInit {

  selektovanaSvinja: Svinja;
  constructor(public dialogRef: MatDialogRef<ChoiceDialogComponent>, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  updateVeterinarskiBroj() {
    const dialogRef = this.dialog.open(ArhivaVetBrDialogComponent);
    dialogRef.componentInstance.selektovanaSvinja = this.selektovanaSvinja;
  }

  updateKategorijaSvinje() {
    const dialogRef = this.dialog.open(UpdateKategorijeComponent);
    dialogRef.componentInstance.selektovanaSvinja = this.selektovanaSvinja;
  }

}
