
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { KlijentComponent } from './components/klijent/klijent.component';
import { NarudzbinaComponent } from './components/narudzbina/narudzbina.component';
import { TipProizvodaComponent } from './components/tip-proizvoda/tip-proizvoda.component';
import { HomeComponent } from './components/core/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { KlijentDialogComponent } from './components/dialogs/klijent-dialog/klijent-dialog.component';
import { TipProizvodaDialogComponent } from './components/dialogs/tip-proizvoda-dialog/tip-proizvoda-dialog.component';
import { NarudzbinaDialogComponent } from './components/dialogs/narudzbina-dialog/narudzbina-dialog.component';
import { StavkaComponent } from './components/stavka/stavka.component';
import { FakturaComponent } from './components/faktura/faktura.component';
import { FakturaDialogComponent } from './components/dialogs/faktura-dialog/faktura-dialog.component';
import { UplataDialogComponent } from './components/dialogs/uplata-dialog/uplata-dialog.component';
import { UplataDodavanjeDialogComponent } from './components/dialogs/uplata-dodavanje-dialog/uplata-dodavanje-dialog.component';
import { StavkaPorudzbineDialogComponent } from './components/dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { FakturisaneStavkeDialogComponent } from './components/dialogs/fakturisane-stavke-dialog/fakturisane-stavke-dialog.component';
import { DeleteFakturaDialogComponent } from './components/dialogs/delete-faktura-dialog/delete-faktura-dialog.component';
import { SvinjaComponent } from './components/nosql/svinja/svinja.component';
import { TerapijePoDanuComponent } from './components/nosql/terapije-po-danu/terapije-po-danu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LegloComponent } from './components/nosql/dialogs/leglo/leglo.component';
import { ArhivaVeterinarskogBrojaComponent } from './components/nosql/arhiva-veterinarskog-broja/arhiva-veterinarskog-broja.component';
import { KategorijePoSvinjiComponent } from './components/nosql/dialogs/kategorije-po-svinji/kategorije-po-svinji.component';
import { PreglediComponent } from './components/nosql/pregledi/pregledi.component';
import { VakcineComponent } from './components/nosql/vakcine/vakcine.component';
import { TerapijePoPregleduDialogComponent } from './components/nosql/dialogs/terapije-po-pregledu-dialog/terapije-po-pregledu-dialog.component';
import { ArhivaVetBrDialogComponent } from './components/nosql/dialogs/arhiva-vet-br-dialog/arhiva-vet-br-dialog.component';
import { BolestiPoPregleduDialogComponent } from './components/nosql/dialogs/bolesti-po-pregledu-dialog/bolesti-po-pregledu-dialog.component';
import { DodajVakcinuDialogComponent } from './components/nosql/dialogs/dodaj-vakcinu-dialog/dodaj-vakcinu-dialog.component';
import { RaseComponent } from './components/nosql/rase/rase.component';
import { KategorijeComponent } from './components/nosql/kategorije/kategorije.component';
import { ChoiceDialogComponent } from './components/nosql/dialogs/choice-dialog/choice-dialog.component';
import { UpdateKategorijeComponent } from './components/nosql/dialogs/update-kategorije/update-kategorije.component';


@NgModule({
  declarations: [
    AppComponent,
    KlijentComponent,
    NarudzbinaComponent,
    TipProizvodaComponent,
    HomeComponent,
    KlijentDialogComponent,
    TipProizvodaDialogComponent,
    NarudzbinaDialogComponent,
    StavkaComponent,
    FakturaComponent,
    FakturaDialogComponent,
    UplataDialogComponent,
    UplataDodavanjeDialogComponent,
    StavkaPorudzbineDialogComponent,
    FakturisaneStavkeDialogComponent,
    DeleteFakturaDialogComponent,
    SvinjaComponent,
    TerapijePoDanuComponent,
    LegloComponent,
    ArhivaVeterinarskogBrojaComponent,
    KategorijePoSvinjiComponent,
    ArhivaVetBrDialogComponent,
    PreglediComponent,
    VakcineComponent,
    BolestiPoPregleduDialogComponent,
    TerapijePoPregleduDialogComponent,
    DodajVakcinuDialogComponent,
    RaseComponent,
    KategorijeComponent,
    ChoiceDialogComponent,
    UpdateKategorijeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule, 
    MatTooltipModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
