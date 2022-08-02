import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ArhivaVeterinarskogBroja } from 'src/app/models/arhiva_veterinarskog_broja';
import { Svinja } from 'src/app/models/svinja';
import { ArhivaVeterinarskogBrojaService } from 'src/app/services/arhiva-veterinarskog-broja.service';

@Component({
  selector: 'app-arhiva-veterinarskog-broja',
  templateUrl: './arhiva-veterinarskog-broja.component.html',
  styleUrls: ['./arhiva-veterinarskog-broja.component.css']
})
export class ArhivaVeterinarskogBrojaComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  
  selektovanaSvinja: Svinja;
  subscription: Subscription; 
  arhiva: ArhivaVeterinarskogBroja[];
  displayedColumns = ['veterinarski_broj','datum_od',  'datum_do',  'veterinar'];
  dataSource!: MatTableDataSource<ArhivaVeterinarskogBroja>;

  constructor(private arhivaVetBrService: ArhivaVeterinarskogBrojaService,
    public dialogRef: MatDialogRef<ArhivaVeterinarskogBrojaComponent>) { }

  ngOnInit(): void {
    this.subscription = this.arhivaVetBrService.getArhivaVeterinarskogBroja(
      this.selektovanaSvinja.tetovir_broj_svinje).subscribe(data => { 
        this.arhiva = data; 
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public zatvori(): void {
    this.dialogRef.close();
  }

}
