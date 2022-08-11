import { KategorijePoSvinjiService } from './../../../../services/kategorije-po-svinji.service';
import { Subscription } from 'rxjs';
import { SvinjaService } from './../../../../services/svinja.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Svinja } from 'src/app/models/svinja';

@Component({
  selector: 'app-update-kategorije',
  templateUrl: './update-kategorije.component.html',
  styleUrls: ['./update-kategorije.component.css']
})
export class UpdateKategorijeComponent implements OnInit {

  izabranaKategorija: string;
  staraKategorija: string;
  selektovanaSvinja: Svinja;
  kategorijeSvinje: Array<string> = new Array<string>();
  subscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateKategorijeComponent>,
    private svinjaService: SvinjaService,
    private kategorijePoSvinjiService: KategorijePoSvinjiService) { }

  ngOnInit(): void {
    this.kategorijePoSvinjiService.getArhivaKategorijaSvinje(this.selektovanaSvinja.tetovir_broj_svinje)
    .subscribe(data => {
        data.forEach(element => {
          this.kategorijeSvinje.push(element.naziv_kategorije);
        });
    });
  }

  izmeniKategorijuSvinje(){
    if (this.izabranaKategorija != this.selektovanaSvinja.kategorija && !this.kategorijeSvinje.includes(this.izabranaKategorija))
    {
      this.staraKategorija = this.selektovanaSvinja.kategorija;
      this.selektovanaSvinja.kategorija = this.izabranaKategorija;
      this.subscription = this.svinjaService.putSvinjePoKategoriji(this.selektovanaSvinja, this.staraKategorija).subscribe();
    }
    else
      this.snackBar.open('Kategorija nije promenjena zbog pravila.', 'Zatvori', { duration: 1000 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', { duration: 1000 });
  }

}
