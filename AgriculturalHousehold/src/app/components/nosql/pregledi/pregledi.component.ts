import { PreglediService } from './../../../services/pregled.service';
import { Pregled } from './../../../models/pregled';
import { Component, Input, OnInit } from '@angular/core';
import { Svinja } from 'src/app/models/svinja';

@Component({
  selector: 'app-pregledi',
  templateUrl: './pregledi.component.html',
  styleUrls: ['./pregledi.component.css']
})
export class PreglediComponent implements OnInit {

  @Input() selektovanaSvinjaPregledi: Svinja;
  preglediPoSvinji: Pregled[];
  constructor(private preglediService: PreglediService) { }

  ngOnInit(): void {
    this.preglediService.getPreglediPoSvinji(this.selektovanaSvinjaPregledi.tetovir_broj_svinje).subscribe(preglediPoSvinji => {
      this.preglediPoSvinji = preglediPoSvinji;
      console.log(preglediPoSvinji);
    });
  }

}
