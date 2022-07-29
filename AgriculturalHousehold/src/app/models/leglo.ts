import { SvinjaType } from "./svinjatype";

export class Leglo {
    oznaka_legla: string;
    datum_prasenja: Date;
    datum_osemenjavanja: Date;
    anomalije: Array<string>;
    broj_zivih: number;
    broj_uginulih: number;
    tip_osemenjavanja: string;
    majka: SvinjaType;
    otac: SvinjaType;
}


