import { NacinUplate } from './nacin_uplate';
import { Faktura } from "./faktura";

export class Uplata {
    id!: number;
    datum_uplate!: Date; 
    faktura!: Faktura;
    nacin_uplate!:NacinUplate;

}