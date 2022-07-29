import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Svinja } from 'src/app/models/svinja';
import { SvinjaService } from 'src/app/services/svinja.service';
import { ArhivaVeterinarskogBrojaComponent } from '../arhiva-veterinarskog-broja/arhiva-veterinarskog-broja.component';
import { KategorijePoSvinjiComponent } from '../kategorije-po-svinji/kategorije-po-svinji.component';
import { LegloComponent } from '../leglo/leglo.component';

@Component({
  selector: 'app-svinja',
  templateUrl: './svinja.component.html',
  styleUrls: ['./svinja.component.css']
})
export class SvinjaComponent implements OnInit, OnDestroy {

  displayedColumns = ['tetovir_broj_svinje', 'oznaka_legla', 'rasa', 'kategorija', 'aktuelni_veterinarski_broj', 'actions'];
  dataSource!: MatTableDataSource<SvinjaComponent>;
  subscription!: Subscription;
  selektovanaRasa!: string;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private svinjaService: SvinjaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    this.subscription = this.svinjaService.getSvinje().subscribe(data => {
      console.log (data);
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

  selektujRasu(rasa: string) {
      this.selektovanaRasa = rasa;
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
}
