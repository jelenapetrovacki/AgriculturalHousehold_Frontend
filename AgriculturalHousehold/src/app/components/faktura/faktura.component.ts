import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Faktura } from 'src/app/models/faktura';
import { Narudzbina } from 'src/app/models/narudzbina';
import { Svrha } from 'src/app/models/svrha';
import { FakturaService } from 'src/app/services/faktura.service';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';
import { FakturaDialogComponent } from '../dialogs/faktura-dialog/faktura-dialog.component';
import { NarudzbinaDialogComponent } from '../dialogs/narudzbina-dialog/narudzbina-dialog.component';
import { UplataDialogComponent } from '../dialogs/uplata-dialog/uplata-dialog.component';
import { UplataDodavanjeDialogComponent } from '../dialogs/uplata-dodavanje-dialog/uplata-dodavanje-dialog.component';

@Component({
  selector: 'app-faktura',
  templateUrl: './faktura.component.html',
  styleUrls: ['./faktura.component.css']
})
export class FakturaComponent implements OnInit {

  displayedColumns = ['id', 'iznos', 'datum_izdavanja', 'svrha', 'narudzbina', 'actions'];
 dataSource!: MatTableDataSource<Faktura>;
 subcription!: Subscription;
 @Input() selektovanaNarudzbina!: Narudzbina;

 constructor(private fakturaService: FakturaService,
   private dialog: MatDialog) { }

 ngOnChanges(): void {
   if(this.selektovanaNarudzbina) {
     this.loadData();
   }
 }

 ngOnDestroy(): void {
   this.subcription.unsubscribe();
 }

 ngOnInit(): void {
   this.loadData();
 }

 loadData() {
   this.subcription = this.fakturaService.getFaktureZaNarudzbinaID(this.selektovanaNarudzbina.id)
         .subscribe(data => {
           this.dataSource = new MatTableDataSource(data);
         }, (error: Error) => {
           console.log(error.name +' '+ error.message);
         });
 }
 prikaziUplatu (row: Faktura) {
 
  const dialogRef = this.dialog.open(UplataDialogComponent);
  dialogRef.componentInstance.selektovanaFakturaID = row.id;
  dialogRef.afterClosed().subscribe(res => {
    if(res === 1) {
      this.loadData();
    }
  });
 }

 dodajUplatu(row: Faktura) {
  const dialogRef = this.dialog.open(UplataDodavanjeDialogComponent, 
    {data: row});
    dialogRef.afterClosed().subscribe(res => {
      if(res === 1) {
        this.loadData();
      }
    });
 }
 openDialog(flag: number, id?:number, iznos?: number, datum_izdavanja?: Date, svrha?: Svrha, narudzbina?:Narudzbina) {

      /*   const dialogRef = this.dialog.open(FakturaDialogComponent, 
           {data:{id,iznos,datum_izdavanja,svrha,narudzbina}});

         dialogRef.componentInstance.flag = flag;
         if(flag === 1) {
           dialogRef.componentInstance.data.narudzbina = this.selektovanaNarudzbina;
         }
         dialogRef.afterClosed().subscribe(res => {
           if(res === 1) {
             this.loadData();
           }
         });
         */
 }
}
