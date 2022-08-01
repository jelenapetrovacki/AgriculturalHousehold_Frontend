import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArhivaVeterinarskogBroja } from 'src/app/models/arhiva_veterinarskog_broja';
import { Svinja } from 'src/app/models/svinja';
import { VeterinarType } from 'src/app/models/veterinar_type';
import { ArhivaVeterinarskogBrojaService } from 'src/app/services/arhiva-veterinarskog-broja.service';

@Component({
  selector: 'app-arhiva-vet-br-dialog',
  templateUrl: './arhiva-vet-br-dialog.component.html',
  styleUrls: ['./arhiva-vet-br-dialog.component.css']
})
export class ArhivaVetBrDialogComponent implements OnInit {

  selektovanaSvinja: Svinja;
  unosVeterinarskogBroja: string;
  noviVeterinarskiBroj: ArhivaVeterinarskogBroja;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArhivaVetBrDialogComponent>, 
    public ahrivaVeterinarskogBrojaService: ArhivaVeterinarskogBrojaService) { }

  ngOnInit(): void {
  }

  izmeniVeterinarskiBroj() {
    this.noviVeterinarskiBroj = new ArhivaVeterinarskogBroja();
    this.noviVeterinarskiBroj.tetovir_broj_svinje = this.selektovanaSvinja.tetovir_broj_svinje;
    this.noviVeterinarskiBroj.veterinarski_broj = this.unosVeterinarskogBroja;
    this.noviVeterinarskiBroj.datum_od = new Date();
    this.noviVeterinarskiBroj.datum_do = null;
   // this.noviVeterinarskiBroj.veterinar = null;

   this.noviVeterinarskiBroj.veterinar = new VeterinarType();
    this.noviVeterinarskiBroj.veterinar.ime = 'Marko';
    this.noviVeterinarskiBroj.veterinar.prezime = 'Markovic';
    this.noviVeterinarskiBroj.veterinar.ustanova = 'Ustanova';
    this.noviVeterinarskiBroj.veterinar.broj_licence = '11111';
    this.noviVeterinarskiBroj.veterinar.kontakt = '06355966654';

    console.log (this.noviVeterinarskiBroj);


    this.ahrivaVeterinarskogBrojaService.addVeterinarskiBroj(this.noviVeterinarskiBroj, this.selektovanaSvinja.aktuelni_veterinarski_broj).subscribe();
  }
  public cancel():void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000});
  }
}
