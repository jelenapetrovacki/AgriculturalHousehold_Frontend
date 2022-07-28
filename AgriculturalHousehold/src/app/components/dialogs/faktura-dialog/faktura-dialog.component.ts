import { StavkaService } from 'src/app/services/stavka.service';
import { Faktura } from 'src/app/models/faktura';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FakturaService } from 'src/app/services/faktura.service';
import { Svrha } from 'src/app/models/svrha';
import { Subscription } from 'rxjs';
import { SvrhaService } from 'src/app/services/svrha.service';
import { Stavka } from 'src/app/models/stavka';

@Component({
  selector: 'app-faktura-dialog',
  templateUrl: './faktura-dialog.component.html',
  styleUrls: ['./faktura-dialog.component.css']
})
export class FakturaDialogComponent implements OnInit, OnDestroy {

  public subscriptionStavke!: Subscription;
  public stavke: Stavka[];
  public postojeStavke: boolean = true;
  public fakturisaneStavke: Stavka[] = new Array(10);
  public index: number = 0;
  public dodataFaktura: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FakturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Faktura,
    public fakturaService: FakturaService,
    public stavkaService: StavkaService) { }

  ngOnDestroy(): void {
    this.subscriptionStavke.unsubscribe();
  }

  ngOnInit(): void {


    this.subscriptionStavke = this.stavkaService.getNefakturisaneStavkeZaNarudzbinaID(this.data.narudzbina.id).subscribe(nefakturisaneStavke => {
      this.stavke = nefakturisaneStavke;
      if (this.stavke.length == 0) {
        this.postojeStavke = false;
      }
    });
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    };
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public dodajStavkeUFakturu(stavka: Stavka): void {
    if (!this.fakturisaneStavke.includes(stavka)) {
      this.fakturisaneStavke[this.index++] = stavka;
    } else {
      this.fakturisaneStavke.splice(this.fakturisaneStavke.indexOf(stavka), 1);
    }

  }

  public add(): void {
    this.data.datum_izdavanja = new Date((<HTMLInputElement>document.getElementById("datum_izdavanja")).value);

    this.fakturaService.addFaktura(this.data).subscribe(faktura => {
      if (typeof this.fakturisaneStavke[0] !== 'undefined') {
        this.fakturisaneStavke.forEach(element => {
          element.faktura = faktura;
        });
        this.stavkaService.updateStavke(this.fakturisaneStavke).subscribe(() => console.log("OK"));
      }


      this.snackBar.open('Uspešno dodata faktura', 'OK', { duration: 2500 })
    },
      (error: Error) => {
        this.snackBar.open('Došlo je do greške prilikom dodavanja fakture', 'Zatvori',
          { duration: 2500 })
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    if (this.postojeStavke) {
      this.snackBar.open('Odustali ste.', 'Zatvori', { duration: 1000 });
    } else {
      this.snackBar.open('Prvo dodajte stavke u narudžbinu!', 'Zatvori', { duration: 1000 });
    }

  }

}
