import { TipProizvodaService } from 'src/app/services/tip-proizvoda.service';
import { TipProizvoda } from 'src/app/models/tip_proizvoda';
import { StavkaService } from 'src/app/services/stavka.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stavka } from 'src/app/models/stavka';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit, OnDestroy {

  public flag!: number;
  public tipovi_proizvoda!: TipProizvoda[];
  public subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stavka,
    public stavkaPorudzbineService: StavkaService,
    public tipProizvodaService: TipProizvodaService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = this.tipProizvodaService.getTipoviProizvoda().subscribe(data => {
      this.tipovi_proizvoda = data;
    });
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    };
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public add(): void {
    this.stavkaPorudzbineService.addStavka(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodata stavka za izabranu narudžbinu!', 'OK', { duration: 2500 })
    },
      (error: Error) => {
        this.snackBar.open('Došlo je do greške prilikom dodavanja stavke za izabranu narudžbinu', 'Zatvori',
          { duration: 2500 })
      });
  }

  public update(): void {
    this.stavkaPorudzbineService.updateStavka(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjena stavka za izabranu narudžbinu!', 'OK', { duration: 2500 })
    },
      (error: Error) => {
        this.snackBar.open('Došlo je do greške prilikom izmene stavke za izabranu narudžbinu!', 'Zatvori',
          { duration: 2500 })
      });
  }

  public delete(): void {
    this.subscription = this.stavkaPorudzbineService.deleteStavka(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana stavka narudžbine: ' + this.data.id, 'OK', {
        duration: 2500
      })
    },
      (error: Error) => {
        this.snackBar.open('Došlo je do greške prilikom brisanja postojeće narudžbine!', 'Zatvori', {
          duration: 2500
        })
      }
    );
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', { duration: 1000 });
  }

}
