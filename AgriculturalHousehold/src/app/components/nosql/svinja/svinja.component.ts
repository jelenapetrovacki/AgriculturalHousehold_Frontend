import { ChoiceDialogComponent } from './../dialogs/choice-dialog/choice-dialog.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Svinja } from 'src/app/models/svinja';
import { SvinjaService } from 'src/app/services/svinja.service';
import { ArhivaVeterinarskogBrojaComponent } from '../arhiva-veterinarskog-broja/arhiva-veterinarskog-broja.component';
import { ArhivaVetBrDialogComponent } from '../dialogs/arhiva-vet-br-dialog/arhiva-vet-br-dialog.component';
import { KategorijePoSvinjiComponent } from '../dialogs/kategorije-po-svinji/kategorije-po-svinji.component';
import { LegloComponent } from '../dialogs/leglo/leglo.component';

@Component({
  selector: 'app-svinja',
  templateUrl: './svinja.component.html',
  styleUrls: ['./svinja.component.css']
})
export class SvinjaComponent implements OnInit, OnDestroy {

  displayedColumns = ['tetovir_broj_svinje', 'oznaka_legla', 'rasa', 'kategorija', 'aktuelni_veterinarski_broj', 'actions'];
  dataSource!: MatTableDataSource<SvinjaComponent>;
  subscription!: Subscription;
  selektovanaSvinjaVakcine: Svinja;
  selektovanaSvinjaPregledi: Svinja;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private svinjaService: SvinjaService,
    private dialog: MatDialog,
    public dialogChoice: MatDialog) { }


  ngOnInit(): void {
    this.loadData();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    this.subscription = this.svinjaService.getSvinje().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     },
     (error:Error) => {
       console.log(error.name + ' ' + error.message);
     }
     );
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  prikaziLeglo(oznaka_legla: string) {
    const dialogRef = this.dialog.open(LegloComponent);
    dialogRef.componentInstance.oznakaLegla = oznaka_legla;
  }

  prikaziArhivuVeterinarskogBroja(svinja: Svinja) {
    const dialogRef = this.dialog.open(ArhivaVeterinarskogBrojaComponent);
    dialogRef.componentInstance.selektovanaSvinja = svinja;
  }

  prikaziArhivuKategorija(svinja: Svinja) {
    const dialogRef = this.dialog.open(KategorijePoSvinjiComponent);
    dialogRef.componentInstance.selektovanaSvinja = svinja;
  }

  openDialog(svinja: Svinja): void {
    this.dialog.open(ChoiceDialogComponent).componentInstance.selektovanaSvinja = svinja;
  }

  readVakcine(svinja: Svinja) {
    this.selektovanaSvinjaPregledi = null;
    this.selektovanaSvinjaVakcine = svinja;
  }

  readPregledi(svinja: Svinja) {
    this.selektovanaSvinjaVakcine = null;
    this.selektovanaSvinjaPregledi = svinja;
  }


}
