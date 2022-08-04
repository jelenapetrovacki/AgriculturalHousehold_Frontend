import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Narudzbina } from 'src/app/models/narudzbina';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';
import { NarudzbinaDialogComponent } from '../dialogs/narudzbina-dialog/narudzbina-dialog.component';

@Component({
  selector: 'app-narudzbina',
  templateUrl: './narudzbina.component.html',
  styleUrls: ['./narudzbina.component.css']
})
export class NarudzbinaComponent implements OnInit {

  displayedColumns = ['id', 'datum', 'iznos', 'klijent', 'actions'];
  dataSource!: MatTableDataSource<NarudzbinaComponent>;
  subscription!: Subscription;
  selektovanaNarudzbina!: Narudzbina;
  faktureIliStavke = 1;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private narudzbinaService: NarudzbinaService, 
    private dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  prikaziFakture(row: Narudzbina) {
    this.faktureIliStavke = 1;
    this.selektovanaNarudzbina = row;
  }
  
  prikaziStavkeNarudzbine(row: Narudzbina) {
    this.faktureIliStavke = 2;
    this.selektovanaNarudzbina = row;
  }


  public loadData() {
    this.subscription = this.narudzbinaService.getNarudzbine().subscribe(data => {
     // console.log(data);
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    },
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }

  public openDialog(flag: number, id?:number, datum?:Date ,iznos?:number,klijent?:Klijent) { 
    const dialogRef = this.dialog.open(NarudzbinaDialogComponent, {data: {id,datum, iznos, klijent}});
  
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    })
  }
  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
