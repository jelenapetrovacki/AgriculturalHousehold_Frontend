import { PreglediService } from './../../../services/pregled.service';
import { Pregled } from './../../../models/pregled';
import { Component, Input, OnInit } from '@angular/core';
import { Svinja } from 'src/app/models/svinja';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BolestiPoPregleduDialogComponent } from '../dialogs/bolesti-po-pregledu-dialog/bolesti-po-pregledu-dialog.component';
import { TerapijePoPregleduDialogComponent } from '../dialogs/terapije-po-pregledu-dialog/terapije-po-pregledu-dialog.component';

@Component({
  selector: 'app-pregledi',
  templateUrl: './pregledi.component.html',
  styleUrls: ['./pregledi.component.css']
})
export class PreglediComponent implements OnInit {

  @Input() selektovanaSvinjaPregledi: Svinja;
  displayedColumns = ['sifra_pregleda', 'naziv_pregleda', 'datum_pregleda', 'izvestaj', 'veterinar', 'actions'];
  dataSource!: MatTableDataSource<Pregled>;
  constructor(private preglediService: PreglediService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.preglediService.getPreglediPoSvinji(this.selektovanaSvinjaPregledi.tetovir_broj_svinje).subscribe(preglediPoSvinji => {
      this.dataSource = new MatTableDataSource(preglediPoSvinji);
    });
  }

  readBolesti(pregled: Pregled) {
    const dialogRef = this.dialog.open(BolestiPoPregleduDialogComponent);
    dialogRef.componentInstance.zaPregled = pregled;
  }

  readTerapije(pregled: Pregled) {
    const dialogRef = this.dialog.open(TerapijePoPregleduDialogComponent,
      {
        height: '300px',
        width: '1000px',
      });
    dialogRef.componentInstance.zaPregled = pregled;
  }

}
