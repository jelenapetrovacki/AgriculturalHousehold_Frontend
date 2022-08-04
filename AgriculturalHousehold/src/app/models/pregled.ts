import { VeterinarType } from "./veterinar_type";

export class Pregled {
    tetovir_broj_svinje!: string;
    sifra_pregleda!: number;
    naziv_pregleda!: string;
    datum_pregleda!: Date;
    izvestaj!:string;
    veterinar: VeterinarType;
}