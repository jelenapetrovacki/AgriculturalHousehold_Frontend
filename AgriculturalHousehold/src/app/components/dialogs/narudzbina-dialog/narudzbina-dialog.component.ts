import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Klijent } from 'src/app/models/klijent';
import { Narudzbina } from 'src/app/models/narudzbina';
import { KlijentService } from 'src/app/services/klijent.service';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';

@Component({
  selector: 'app-narudzbina-dialog',
  templateUrl: './narudzbina-dialog.component.html',
  styleUrls: ['./narudzbina-dialog.component.css']
})
export class NarudzbinaDialogComponent implements OnInit {

  public flag!: number;
  public klijenti!:Klijent[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NarudzbinaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Narudzbina,
    public narudzbinaService: NarudzbinaService,
    public klijentService: KlijentService) { }

  ngOnInit(): void {
    this.klijentService.getKlijenti().subscribe(klijentiIzBaze =>
      {
        this.klijenti = klijentiIzBaze;
      });
  }

    
  compareTo(a:any, b:any) {
    return a.id == b.id;
  }
  
  public add():void {
    this.narudzbinaService.addNarudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodata narudžbina', 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja narudžbine', 'Zatvori',
       {duration:2500})
    });
  }

  public update():void {
    this.narudzbinaService.updateNarudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjena narudžbina', 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene narudžbine', 'Zatvori',
       {duration:2500})
    });
  }

  public delete(): void {
    this.narudzbinaService.deleteNarudzbina(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana narudžbina' , 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojeće narudžbine.', 'Zatvori', {
        duration:2500
      })
    }
    );
  }
  public cancel():void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000});
  }

}
