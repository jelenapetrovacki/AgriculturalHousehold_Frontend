import { BolestiPoPregleduService } from './../../../../services/bolesti-po-pregledu.service';
import { PreglediService } from './../../../../services/pregled.service';
import { Pregled } from './../../../../models/pregled';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bolesti-po-pregledu-dialog',
  templateUrl: './bolesti-po-pregledu-dialog.component.html',
  styleUrls: ['./bolesti-po-pregledu-dialog.component.css']
})
export class BolestiPoPregleduDialogComponent implements OnInit {

  subscription: Subscription;
  zaPregled: Pregled;
  displayedColumns = [ 'naziv_bolesti', 'simptomi'];
  dataSource!: MatTableDataSource<BolestiPoPregleduDialogComponent>;

  constructor(private bolestiPoPregleduService: BolestiPoPregleduService,
    public dialogRef: MatDialogRef<BolestiPoPregleduDialogComponent>) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subscription = this.bolestiPoPregleduService.getBolestiPoPregledu(this.zaPregled.sifra_pregleda).subscribe(data => {
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
