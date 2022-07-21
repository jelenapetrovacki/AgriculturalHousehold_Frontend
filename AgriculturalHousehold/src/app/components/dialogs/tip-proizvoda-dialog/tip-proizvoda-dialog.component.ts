import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipProizvoda } from 'src/app/models/tip_proizvoda';
import { TipProizvodaService } from 'src/app/services/tip-proizvoda.service';

@Component({
  selector: 'app-tip-proizvoda-dialog',
  templateUrl: './tip-proizvoda-dialog.component.html',
  styleUrls: ['./tip-proizvoda-dialog.component.css']
})
export class TipProizvodaDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipProizvodaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: TipProizvoda,
    public tipProizvodaService: TipProizvodaService) { }

  ngOnInit(): void {
  }

  public add():void {
    this.data.aktuelan = true;
    this.tipProizvodaService.addTipProizvoda(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat tip proizvoda ' + this.data.naziv_tipa, 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja tipa proizvoda', 'Zatvori',
       {duration:2500})
    });
  }

  public update():void {
    this.tipProizvodaService.updateTipProizvoda(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen tip proizvoda ' + this.data.naziv_tipa, 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene tipa proizvoda', 'Zatvori',
       {duration:2500})
    });
  }

  public delete():void {
  
    this.data.aktuelan = false; 
    this.update();
  }

  public cancel():void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000});
  }
}
