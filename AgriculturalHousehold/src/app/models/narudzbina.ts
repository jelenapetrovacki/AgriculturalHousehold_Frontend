import { Klijent } from "./klijent";

export class Narudzbina {
    id!: number;
    datum!: Date;
    iznos!: number;
    klijent!: Klijent;
}