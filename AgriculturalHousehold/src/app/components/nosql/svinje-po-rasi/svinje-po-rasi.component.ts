import { SvinjePoRasi } from './../../../models/svinje-po-rasi';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SvinjaService } from 'src/app/services/svinja.service';

@Component({
  selector: 'app-svinje-po-rasi',
  templateUrl: './svinje-po-rasi.component.html',
  styleUrls: ['./svinje-po-rasi.component.css']
})
export class SvinjePoRasiComponent implements OnInit, OnDestroy {

  //displayedColumns = ['oznaka_rase', 'tetovir_broj_svinje', 'naziv_rase'];
  //dataSource!: MatTableDataSource<SvinjePoRasiComponent>;
  svinjePoRasi: SvinjePoRasi[];
  subscription!: Subscription;
  @Input() selektovanaRasa!: string;

  constructor(private svinjaService: SvinjaService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    this.subscription = this.svinjaService.getSvinjePoRasi(this.selektovanaRasa).subscribe(data => {
      this.svinjePoRasi = data;
      console.log(data);
    },
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }



}
