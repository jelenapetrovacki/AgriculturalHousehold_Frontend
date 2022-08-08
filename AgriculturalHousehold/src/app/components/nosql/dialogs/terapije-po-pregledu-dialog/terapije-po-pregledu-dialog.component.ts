import { TerapijePoPregleduService } from './../../../../services/terapije-po-pregledu.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Pregled } from 'src/app/models/pregled';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terapije-po-pregledu-dialog',
  templateUrl: './terapije-po-pregledu-dialog.component.html',
  styleUrls: ['./terapije-po-pregledu-dialog.component.css']
})
export class TerapijePoPregleduDialogComponent implements OnInit {

  subscription: Subscription;
  zaPregled: Pregled;
  displayedColumns = [ 'terapija_tip', 'terapija_naziv', 'datum_od', 'datum_do', 'dnevni_broj_davanja', 'doza'];
  dataSource!: MatTableDataSource<TerapijePoPregleduDialogComponent>;

  constructor(private terapijePoPregleduService: TerapijePoPregleduService,
    public dialogRef: MatDialogRef<TerapijePoPregleduDialogComponent>) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subscription = this.terapijePoPregleduService.getTerapijePoPregledu(this.zaPregled.sifra_pregleda).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public zatvori(): void {
    this.dialogRef.close();
  }

}
