import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Svinja } from 'src/app/models/svinja';
import { KategorijePoSvinjiService } from 'src/app/services/kategorije-po-svinji.service';

@Component({
  selector: 'app-kategorije-po-svinji',
  templateUrl: './kategorije-po-svinji.component.html',
  styleUrls: ['./kategorije-po-svinji.component.css']
})
export class KategorijePoSvinjiComponent implements OnInit, OnDestroy {
  
  selektovanaSvinja: Svinja;
  subscription: Subscription; 
  displayedColumns = ['naziv_kategorije', 'datum_od', 'datum_do'];
  dataSource!: MatTableDataSource<KategorijePoSvinjiComponent>;

  constructor(private kategorijeService: KategorijePoSvinjiService,
    public dialogRef: MatDialogRef<KategorijePoSvinjiComponent>) { }

  ngOnInit(): void {
    this.subscription = this.kategorijeService.getArhivaKategorijaSvinje(
      this.selektovanaSvinja.tetovir_broj_svinje).subscribe(data => { 
        this.dataSource = new MatTableDataSource(data) 
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public zatvori(): void {
    this.dialogRef.close();
  }

}
