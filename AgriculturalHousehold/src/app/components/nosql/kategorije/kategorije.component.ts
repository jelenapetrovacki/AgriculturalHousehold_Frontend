import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Svinja } from 'src/app/models/svinja';
import { RasaKategorijaService } from 'src/app/services/rasa_kategorija.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SvinjaService } from 'src/app/services/svinja.service';

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class KategorijeComponent implements OnInit {

  columnsToDisplay = ['naziv_kategorije', 'pol_svinje', 'uzrast', 'rasno_poreklo', 'masa_trupa', 'trup'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource!: MatTableDataSource<KategorijeComponent>;
  subscription!: Subscription;

  expandedElement: Svinja | null;
  svinjePoKategoriji: Svinja[];

  constructor(private rasaKategorijaService: RasaKategorijaService, private svinjaService: SvinjaService) { }


  ngOnInit(): void {
    this.loadData();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadData(): void {
    this.subscription = this.rasaKategorijaService.getKategorija().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
     },
     (error:Error) => {
       console.log(error.name + ' ' + error.message);
     }
     );
  }

  loadSvinjePoKategoriji(kategorija: string): void {
    this.subscription = this.svinjaService.getSvinjePoKategoriji(kategorija).subscribe(data => {
      this.svinjePoKategoriji = data;
      console.log(kategorija);
     },
     (error:Error) => {
       console.log(error.name + ' ' + error.message);
     }
     );
  }

}
