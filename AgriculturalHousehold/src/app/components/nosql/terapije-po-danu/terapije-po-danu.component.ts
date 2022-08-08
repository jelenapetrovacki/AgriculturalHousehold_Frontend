import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TerapijePoDanu } from 'src/app/models/terapije_po_danu';
import { TerapijeService } from 'src/app/services/terapije-po-danu.service';

@Component({
  selector: 'app-terapije-po-danu',
  templateUrl: './terapije-po-danu.component.html',
  styleUrls: ['./terapije-po-danu.component.css']
})
export class TerapijePoDanuComponent implements OnInit {

  displayedColumns = ['tetovir_broj_svinje', 'doza', 'dnevni_broj_davanja', 'lek', 'datum'];
  dataSource!: MatTableDataSource<TerapijePoDanu>;
  subscription!: Subscription;
  datum: Date;
 

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private terapijeService: TerapijeService) { }


  ngOnInit(): void {
    this.datum = new Date();

    this.loadData();
  }

  loadData() {
    this.subscription = this.terapijeService.getTerapijePoDanu().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
