import { Subscription } from 'rxjs';
import { StavkaService } from 'src/app/services/stavka.service';
import { Faktura } from 'src/app/models/faktura';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stavka } from 'src/app/models/stavka';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fakturisane-stavke-dialog',
  templateUrl: './fakturisane-stavke-dialog.component.html',
  styleUrls: ['./fakturisane-stavke-dialog.component.css']
})
export class FakturisaneStavkeDialogComponent implements OnInit {

  subscription: Subscription;
  fakturisaneStavke: Stavka[];
  displayedColumns = ['tipProizvoda', 'kolicina', 'obracunataCena'];
  dataSource!: MatTableDataSource<FakturisaneStavkeDialogComponent>;
  postojeStavke: boolean = true;

  constructor(public dialogRef: MatDialogRef<FakturisaneStavkeDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public stavkeZaFakturu: Faktura,
    public fakturisaneStavkeService: StavkaService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.fakturisaneStavkeService.getStavkeZaFakturaID(this.stavkeZaFakturu.id).subscribe(fakturisaneStavke => {
     // console.log(data);
     this.dataSource = new MatTableDataSource(fakturisaneStavke);
     if(this.dataSource.data.length==0){
      this.postojeStavke=false;
     }
    },
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }

  public zatvori():void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
