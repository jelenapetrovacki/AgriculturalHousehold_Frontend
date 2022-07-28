import { NacinUplate } from './../../../models/nacin_uplate';
import { NacinUplateService } from './../../../services/nacin-uplate.service';
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
  public naciniUplate: NacinUplate[];
  public nacinUplate: NacinUplate;
  public selektovanaFakturaID!: number;
  public postojiUplata: boolean = false;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<UplataDodavanjeDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Faktura,
    public uplataService: UplataService,
    public nacinUplateService: NacinUplateService) { 
      this.uplata = new Uplata();
    }

  ngOnInit(): void {
    this.nacinUplateService.getNaciniUplate().subscribe(naciniUplate => {
      this.naciniUplate = naciniUplate;
    });

    this.uplataService.getUplataZaFakturaID(this.selektovanaFakturaID).subscribe(uplata => {
      if(uplata!=null){
        this.postojiUplata = true;
      }
    });
  }

  compareTo(a:any, b:any) {
    return a.id == b.id;
  }

  public add():void {
    this.uplata.datum_uplate = new Date((<HTMLInputElement>document.getElementById("datum_uplate")).value);
    this.uplata.faktura = this.data;
    this.uplata.nacin_uplate = this.nacinUplate;
    console.log(this.uplata);
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
