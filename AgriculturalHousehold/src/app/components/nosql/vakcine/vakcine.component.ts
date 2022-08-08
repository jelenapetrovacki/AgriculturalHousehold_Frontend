import { DodajVakcinuDialogComponent } from './../dialogs/dodaj-vakcinu-dialog/dodaj-vakcinu-dialog.component';
import { VakcinaPoSvinji } from '../../../models/vakcina_po_svinji';
import { VakcineService } from './../../../services/vakcina.service';
import { Svinja } from './../../../models/svinja';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vakcine',
  templateUrl: './vakcine.component.html',
  styleUrls: ['./vakcine.component.css']
})
export class VakcineComponent implements OnInit, OnChanges {

  @Input() selektovanaSvinjaVakcine: Svinja;
  displayedColumns = ['sifra_vakcine', 'naziv_tipa_vakcine', 'datum_davanja', 'kolicina_doze_vakcine',
    'veterinar'];
  dataSource!: MatTableDataSource<VakcinaPoSvinji>;
  brojVakcina: number;
  public subscription!: Subscription;

  constructor(private vakcineService: VakcineService, private dialog: MatDialog, public vakcinaService: VakcineService) { }

  ngOnChanges(): void {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.vakcineService.getVakcinePoSvinji(this.selektovanaSvinjaVakcine.tetovir_broj_svinje).subscribe(vakcinePoSvinji => {
      this.dataSource = new MatTableDataSource(vakcinePoSvinji);

      this.vakcineService.getBrojVakcinaPoSvinji(this.selektovanaSvinjaVakcine.tetovir_broj_svinje).subscribe(brojVakcina => {
        //ovde ni nema modela npr a rai lepo!!!!!
        if (brojVakcina) {
          this.brojVakcina = brojVakcina.broj_vakcina
        }
      }
      );

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DodajVakcinuDialogComponent);
    dialogRef.componentInstance.selektovanaSvinjaVakcine = this.selektovanaSvinjaVakcine;

    dialogRef.afterClosed().subscribe(vakcinaToAdd => {
      if(vakcinaToAdd) {
        this.subscription = this.vakcinaService.postVakcinePoSvinji(vakcinaToAdd).subscribe(() =>
        this.loadData()
        );    
      }
    })
  }

}
