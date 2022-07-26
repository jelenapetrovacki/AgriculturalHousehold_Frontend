import { NarudzbinaService } from 'src/app/services/narudzbina.service';
import { StavkaPorudzbineDialogComponent } from './../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Faktura } from 'src/app/models/faktura';
import { Narudzbina } from 'src/app/models/narudzbina';
import { Stavka } from 'src/app/models/stavka';
import { TipProizvoda } from 'src/app/models/tip_proizvoda';
import { StavkaService } from 'src/app/services/stavka.service';

@Component({
  selector: 'app-stavka',
  templateUrl: './stavka.component.html',
  styleUrls: ['./stavka.component.css']
})
export class StavkaComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id', 'kolicina', 'jedinica_mere', 'obracunata_cena', 'narudzbina', 'tip_proizvoda', 'faktura', 'actions'];
  dataSource!: MatTableDataSource<Stavka>;
  subcription!: Subscription;
  @Input() selektovanaNarudzbina!: Narudzbina;

  constructor(private stavkaService: StavkaService,
   private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngOnChanges(): void {
    if(this.selektovanaNarudzbina) {
      this.loadData();
    }
  }
  loadData() {
    this.subcription = this.stavkaService.getStavkeZaNarudzbinaID(this.selektovanaNarudzbina.id)
         .subscribe(data => {
           this.dataSource = new MatTableDataSource(data);
           console.log(data[0]);
         }, (error: Error) => {
           console.log(error.name +' '+ error.message);
         });    
  }
  openDialog(flag: number, id?:number, kolicina?: number, jedinica_mere?: string, obracunata_cena?: number,
     narudzbina?:Narudzbina, tip_proizvoda?: TipProizvoda, faktura?: Faktura) { 
      
      obracunata_cena = 0;
      narudzbina = this.selektovanaNarudzbina
      const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, {data: {id,kolicina, jedinica_mere, obracunata_cena, narudzbina, tip_proizvoda, faktura}});
  
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1) {
          this.loadData();
        }
      })
  }
}
