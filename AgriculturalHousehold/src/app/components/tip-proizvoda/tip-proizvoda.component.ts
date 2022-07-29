import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipProizvodaService } from 'src/app/services/tip-proizvoda.service';
import { TipProizvodaDialogComponent } from '../dialogs/tip-proizvoda-dialog/tip-proizvoda-dialog.component';

@Component({
  selector: 'app-tip-proizvoda',
  templateUrl: './tip-proizvoda.component.html',
  styleUrls: ['./tip-proizvoda.component.css']
})
export class TipProizvodaComponent implements OnInit {

  displayedColumns = ['id', 'naziv_tipa', 'jedinicna_cena', 'aktuelan', 'actions'];
  dataSource!: MatTableDataSource<TipProizvodaComponent>;
  subscription!: Subscription;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private tipProizvodaService: TipProizvodaService, 
    private dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.tipProizvodaService.getTipoviProizvoda().subscribe(data => {
      console.log(data);
     this.dataSource = new MatTableDataSource(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    },
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }

  public openDialog(flag: number, id?:number, naziv_tipa?:string ,jedinicna_cena?:number,aktuelan?:boolean) { 
    const dialogRef = this.dialog.open(TipProizvodaDialogComponent, {data: {id,naziv_tipa, jedinicna_cena, aktuelan}});
  
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
