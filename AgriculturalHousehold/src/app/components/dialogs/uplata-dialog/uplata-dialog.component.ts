import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Uplata } from 'src/app/models/uplata';
import { UplataService } from 'src/app/services/uplata.service';

@Component({
  selector: 'app-uplata-dialog',
  templateUrl: './uplata-dialog.component.html',
  styleUrls: ['./uplata-dialog.component.css']
})
export class UplataDialogComponent implements OnInit {

  public selektovanaFakturaID!: number;
  public uplata!: Uplata;
  constructor(public uplataService: UplataService, public dialogRef: MatDialogRef<UplataDialogComponent>) { }

  ngOnInit(): void {
    this.uplataService.getUplataZaFakturaID(this.selektovanaFakturaID).subscribe(uplata => 
      this.uplata = uplata);
  }

  public zatvori():void {
    this.dialogRef.close();
  }

}
