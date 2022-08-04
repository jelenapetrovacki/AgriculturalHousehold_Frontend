import { VeterinarType } from './veterinar_type';
export class Vakcina {
    tetovir_broj_svinje!: string;
    sifra_davanja_vakcine!: string; //inace je uuid
    datum_davanja!: Date;
    sifra_vakcine!: string;
    broj_doza_vakcine!:number;
    kolicina_doze_vakcine!:number;
    naziv_tipa_vakcine: string;
    opis_tipa_vakcine: string;
    veterinar: VeterinarType;
}