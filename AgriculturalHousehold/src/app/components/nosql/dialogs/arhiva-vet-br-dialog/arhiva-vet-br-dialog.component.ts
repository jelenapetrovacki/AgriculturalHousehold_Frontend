
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArhivaVeterinarskogBroja } from 'src/app/models/arhiva_veterinarskog_broja';
import { ArhivaVeterinarskogBrojaService } from 'src/app/services/arhiva-veterinarskog-broja.service';
import { Router } from '@angular/router';
import { Veterinar } from 'src/app/models/veterinar';
import { VeterinarService } from 'src/app/services/veterinar.service';
import { VeterinarType } from 'src/app/models/veterinar_type';
import { Svinja } from 'src/app/models/svinja';

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
  veterinari: Veterinar[];
  izabraniVeterinar: Veterinar;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArhivaVetBrDialogComponent>,
    public ahrivaVeterinarskogBrojaService: ArhivaVeterinarskogBrojaService, 
    public veterinariService: VeterinarService,
    private router: Router) { }

  ngOnInit(): void {
    this.noviVeterinarskiBrojObject = new ArhivaVeterinarskogBroja();
    this.veterinariService.getVeterinari().subscribe(veterinariResult => {
        this.veterinari = veterinariResult;
    });
  }

  izmeniVeterinarskiBroj() {

    this.dodajNoviVeterinarskiBrojObject();

    this.stariVeterinarskiBrojString = this.selektovanaSvinja.aktuelni_veterinarski_broj;
    this.ahrivaVeterinarskogBrojaService.addVeterinarskiBroj(this.noviVeterinarskiBrojObject,
      this.stariVeterinarskiBrojString).subscribe(() => {
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
    this.noviVeterinarskiBrojObject.veterinar = new VeterinarType();
    this.noviVeterinarskiBrojObject.veterinar.ime = this.izabraniVeterinar.veterinar_podaci.ime; 
    this.noviVeterinarskiBrojObject.veterinar.prezime = this.izabraniVeterinar.veterinar_podaci.prezime; 
    this.noviVeterinarskiBrojObject.veterinar.ustanova = this.izabraniVeterinar.veterinar_podaci.ustanova; 
    this.noviVeterinarskiBrojObject.veterinar.broj_licence = this.izabraniVeterinar.veterinar_podaci.broj_licence; 
    this.noviVeterinarskiBrojObject.veterinar.kontakt = this.izabraniVeterinar.veterinar_podaci.kontakt; 
  }

  compareTo(a: any, b: any) {
    return a.id == b.id;
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', { duration: 1000 });
  }
}
