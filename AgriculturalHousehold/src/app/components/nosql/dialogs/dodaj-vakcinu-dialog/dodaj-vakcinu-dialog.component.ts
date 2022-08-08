import { Vakcina } from './../../../../models/vakcina';
import { VakcinaPoSvinji } from '../../../../models/vakcina_po_svinji';
import { Component, OnInit } from '@angular/core';
import { Svinja } from 'src/app/models/svinja';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { VeterinarService } from 'src/app/services/veterinar.service';
import { Veterinar } from 'src/app/models/veterinar';
import { VakcineService } from 'src/app/services/vakcina.service';
import { Subscription } from 'rxjs';
import { VeterinarType } from 'src/app/models/veterinar_type';

@Component({
  selector: 'app-dodaj-vakcinu-dialog',
  templateUrl: './dodaj-vakcinu-dialog.component.html',
  styleUrls: ['./dodaj-vakcinu-dialog.component.css']
})
export class DodajVakcinuDialogComponent implements OnInit {

  selektovanaSvinjaVakcine: Svinja;
  veterinari: Veterinar[];
  izabraniVeterinar: Veterinar;

  vakcine: Vakcina[];
  izabranaVakcina: Vakcina;

  vakcinaToAdd: VakcinaPoSvinji = new VakcinaPoSvinji();

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DodajVakcinuDialogComponent>,
    public veterinariService: VeterinarService,
    public vakcinaService: VakcineService) { }

  ngOnInit(): void {
    this.loadData();
  }


  public add(): void {
    this.vakcinaToAdd.tetovir_broj_svinje = this.selektovanaSvinjaVakcine.tetovir_broj_svinje;
    this.vakcinaToAdd.sifra_vakcine = this.izabranaVakcina.sifra_vakcine;
    this.vakcinaToAdd.naziv_tipa_vakcine = this.izabranaVakcina.naziv_tipa_vakcine;
    this.vakcinaToAdd.opis_tipa_vakcine = this.izabranaVakcina.opis_tipa_vakcine;

    //veterinar
    this.vakcinaToAdd.veterinar = new VeterinarType();
    this.vakcinaToAdd.veterinar.ime = this.izabraniVeterinar.veterinar_podaci.ime; 
    this.vakcinaToAdd.veterinar.prezime = this.izabraniVeterinar.veterinar_podaci.prezime; 
    this.vakcinaToAdd.veterinar.ustanova = this.izabraniVeterinar.veterinar_podaci.ustanova; 
    this.vakcinaToAdd.veterinar.broj_licence = this.izabraniVeterinar.veterinar_podaci.broj_licence; 
    this.vakcinaToAdd.veterinar.kontakt = this.izabraniVeterinar.veterinar_podaci.kontakt; 

    this.dialogRef.close(this.vakcinaToAdd);
  }

  loadData(): void {
    this.veterinariService.getVeterinari().subscribe(veterinariResult => {
      this.veterinari = veterinariResult;
    });

    this.vakcinaService.getVakcine().subscribe(vakcine => {
      this.vakcine = vakcine;
    });

  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', { duration: 1000 });
  }

}
