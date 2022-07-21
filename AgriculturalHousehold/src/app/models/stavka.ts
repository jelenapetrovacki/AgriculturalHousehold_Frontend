import { Faktura } from "./faktura";
import { Narudzbina } from "./narudzbina";
import { TipProizvoda } from "./tip_proizvoda";

export class Stavka {
    id!: number;
    kolicina!: number;
    jedinica_mere!: string;
    obracunata_cena!: number;
    narudzbina!: Narudzbina;
    tip_proizvoda!: TipProizvoda;
    faktura!: Faktura;
}
