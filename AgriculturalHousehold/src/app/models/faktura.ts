import { Narudzbina } from "./narudzbina";
import { Svrha } from "./svrha";

export class Faktura {
    id!: number;
    iznos!: number;
    datum_izdavanja!: Date; 
    svrha!: Svrha;
    narudzbina!: Narudzbina;
}
