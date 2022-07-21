import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Klijent } from 'src/app/models/klijent';
import { KlijentService } from 'src/app/services/klijent.service';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<KlijentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Klijent,
    public klijentService: KlijentService) { }

  ngOnInit(): void {
  }

  public add():void {
    this.klijentService.addKlijent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat klijent ' + this.data.naziv, 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja klijenta', 'Zatvori',
       {duration:2500})
    });
  }

  public update():void {
    this.klijentService.updateKlijent(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen klijent ' + this.data.naziv, 'OK', {duration:2500})
    },
    (error:Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene klijenta', 'Zatvori',
       {duration:2500})
    });
  }

  public cancel():void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000});
  }
}
