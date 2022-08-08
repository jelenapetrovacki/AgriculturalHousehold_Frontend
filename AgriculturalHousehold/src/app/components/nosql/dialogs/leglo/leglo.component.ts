import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Leglo } from 'src/app/models/leglo';
import { LegloService } from 'src/app/services/leglo.service';

@Component({
  selector: 'app-leglo',
  templateUrl: './leglo.component.html',
  styleUrls: ['./leglo.component.css']
})
export class LegloComponent implements OnInit, OnDestroy {

  public oznakaLegla!: string;
  leglo: Leglo;
  subscription: Subscription; 

  constructor(private legloService: LegloService,
    public dialogRef: MatDialogRef<LegloComponent>) { }

  ngOnInit(): void {
    this.subscription = this.legloService.getLeglo(this.oznakaLegla).subscribe(data => this.leglo = data );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public zatvori(): void {
    this.dialogRef.close();
  }
}
