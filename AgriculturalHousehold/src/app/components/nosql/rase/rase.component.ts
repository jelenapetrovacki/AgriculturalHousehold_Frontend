import { SvinjaService } from 'src/app/services/svinja.service';
import { Svinja } from './../../../models/svinja';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RasaKategorijaService } from 'src/app/services/rasa_kategorija.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-rase',
  templateUrl: './rase.component.html',
  styleUrls: ['./rase.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RaseComponent implements OnInit {

  dataSource!: MatTableDataSource<RaseComponent>;
  subscription!: Subscription;
  
  columnsToDisplay = ['naziv_rase', 'opis', 'alternativno_ime', 'zemlja_porekla'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Svinja | null;

  svinjePoRasi: Svinja[];

  constructor(private rasaKategorijaService: RasaKategorijaService, private svinjaService: SvinjaService) { }

  ngOnInit(): void {
    this.loadData();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    this.subscription = this.rasaKategorijaService.getRase().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
     },
     (error:Error) => {
       console.log(error.name + ' ' + error.message);
     }
     );
  }

  loadSvinjePoRasi(naziv_rase: string): void {
    this.subscription = this.svinjaService.getSvinjePoRasi(naziv_rase).subscribe(data => {
      this.svinjePoRasi = data;
     },
     (error:Error) => {
       console.log(error.name + ' ' + error.message);
     }
     );
  }

}
