import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Faktura } from 'src/app/models/faktura';
import { Stavka } from 'src/app/models/stavka';
import { FakturaService } from 'src/app/services/faktura.service';
import { StavkaService } from 'src/app/services/stavka.service';

@Component({
  selector: 'app-delete-faktura-dialog',
  templateUrl: './delete-faktura-dialog.component.html',
  styleUrls: ['./delete-faktura-dialog.component.css']
})
export class DeleteFakturaDialogComponent implements OnInit {

  public fakturisaneStavke: Stavka[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteFakturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public faktura: Faktura,
    public fakturaService: FakturaService,
    public stavkaService: StavkaService) { }

  ngOnInit(): void {
    this.stavkaService.getStavkeZaFakturaID(this.faktura.id).subscribe(fakturisaneStavke => {
      this.fakturisaneStavke = fakturisaneStavke;
    });
  }

  public delete(): void {
    this.fakturaService.deleteFaktura(this.faktura.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana faktura', 'OK', {
        duration: 2500
      })
    },
      (error: Error) => {
        this.snackBar.open('Došlo je do greške prilikom brisanja postojeće fakture.', 'Zatvori', {
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
