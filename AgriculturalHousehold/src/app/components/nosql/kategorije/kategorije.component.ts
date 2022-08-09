import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RasaKategorijaService } from 'src/app/services/rasa_ketegorija.service';

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css']
})
export class KategorijeComponent implements OnInit {

  displayedColumns = ['naziv_kategorije', 'pol_svinje', 'uzrast', 'rasno_poreklo', 'masa_trupa', 'trup'];
  dataSource!: MatTableDataSource<KategorijeComponent>;
  subscription!: Subscription;

  constructor(private rasaKategorijaService: RasaKategorijaService) { }


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

}
