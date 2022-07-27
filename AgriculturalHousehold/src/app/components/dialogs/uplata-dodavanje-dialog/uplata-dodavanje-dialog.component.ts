import { getLocaleDateFormat } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Faktura } from 'src/app/models/faktura';
import { Uplata } from 'src/app/models/uplata';
import { UplataService } from 'src/app/services/uplata.service';

@Component({
  selector: 'app-uplata-dodavanje-dialog',
  templateUrl: './uplata-dodavanje-dialog.component.html',
  styleUrls: ['./uplata-dodavanje-dialog.component.css']
})
export class UplataDodavanjeDialogComponent implements OnInit {

  public uplata: Uplata;
  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<UplataDodavanjeDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Faktura,
    public uplataService: UplataService) { 
      this.uplata = new Uplata();
    }

  ngOnInit(): void {
    
  }
  public add():void {
    this.uplata.datum_uplate = new Date((<HTMLInputElement>document.getElementById("datum_uplate")).value);
    this.uplata.faktura = this.data;
    this.uplataService.addUplata(this.uplata).subscribe(() => {
      this.snackBar.open('Uspešno dodata uplata ' + this.uplata.id, 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja uplate', 'Zatvori',
       {duration:2500})
    });
  }

  public cancel():void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000});
  }
}
