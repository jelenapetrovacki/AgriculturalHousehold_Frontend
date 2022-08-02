import { VeterinarType } from './../../../models/veterinar_type';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArhivaVeterinarskogBroja } from 'src/app/models/arhiva_veterinarskog_broja';
import { Svinja } from 'src/app/models/svinja';
import { ArhivaVeterinarskogBrojaService } from 'src/app/services/arhiva-veterinarskog-broja.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arhiva-vet-br-dialog',
  templateUrl: './arhiva-vet-br-dialog.component.html',
  styleUrls: ['./arhiva-vet-br-dialog.component.css']
})
export class ArhivaVetBrDialogComponent implements OnInit {

  selektovanaSvinja: Svinja;
  noviVeterinarskiBrojString: string;
  stariVeterinarskiBrojString: string
  noviVeterinarskiBrojObject: ArhivaVeterinarskogBroja;
  veterinari: VeterinarType[] = new Array();

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArhivaVetBrDialogComponent>,
    public ahrivaVeterinarskogBrojaService: ArhivaVeterinarskogBrojaService, 
    private router: Router) { }

  ngOnInit(): void {
    this.noviVeterinarskiBrojObject = new ArhivaVeterinarskogBroja();

    this.veterinari = [{ ime: 'Marko', prezime: 'Markovic', ustanova: 'Ustanova Markovic', broj_licence: '1af52', kontakt: '063566654' },
    { ime: 'Lazar', prezime: 'Lazaric', ustanova: 'Ustanova Laza Lazovic', broj_licence: '151cef', kontakt: '063545154' }];

  }

  izmeniVeterinarskiBroj() {

    this.dodajNoviVeterinarskiBrojObject();

    this.stariVeterinarskiBrojString = this.selektovanaSvinja.aktuelni_veterinarski_broj;
    this.ahrivaVeterinarskogBrojaService.addVeterinarskiBroj(this.noviVeterinarskiBrojObject,
      this.stariVeterinarskiBrojString).subscribe(() => {
        console.log("OK");
        this.router.navigate(['/svinje']).then(() => {
          window.location.reload();
        });
      });
  }

  dodajNoviVeterinarskiBrojObject() {
    this.noviVeterinarskiBrojObject.tetovir_broj_svinje = this.selektovanaSvinja.tetovir_broj_svinje;
    this.noviVeterinarskiBrojObject.datum_od = null; //setovacemo ga na backendu
    this.noviVeterinarskiBrojObject.veterinarski_broj = this.noviVeterinarskiBrojString;
    this.noviVeterinarskiBrojObject.datum_do = null; //svakako je null jer je aktuelni veterinarski broj
    //setovan je kroz ng model sa htmlom
    //this.noviVeterinarskiBrojObject.veterinar 
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', { duration: 1000 });
  }
}
