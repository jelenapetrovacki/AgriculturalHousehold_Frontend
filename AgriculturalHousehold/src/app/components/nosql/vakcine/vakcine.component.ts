import { Vakcina } from './../../../models/vakcina';
import { VakcineService } from './../../../services/vakcina.service';
import { Svinja } from './../../../models/svinja';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vakcine',
  templateUrl: './vakcine.component.html',
  styleUrls: ['./vakcine.component.css']
})
export class VakcineComponent implements OnInit {

  @Input() selektovanaSvinjaVakcine: Svinja;
  vakcinePoSvinji: Vakcina[];
  constructor(private vakcineService: VakcineService) { }

  ngOnInit(): void {
    this.vakcineService.getVakcinePoSvinji(this.selektovanaSvinjaVakcine.tetovir_broj_svinje).subscribe(vakcinePoSvinji => {
      this.vakcinePoSvinji = vakcinePoSvinji;
      console.log(vakcinePoSvinji);
    });
  }

}
