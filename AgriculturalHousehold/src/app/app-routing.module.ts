import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { KlijentComponent } from './components/klijent/klijent.component';
import { NarudzbinaComponent } from './components/narudzbina/narudzbina.component';
import { SvinjaComponent } from './components/nosql/svinja/svinja.component';
import { TerapijePoDanuComponent } from './components/nosql/terapije-po-danu/terapije-po-danu.component';
import { TipProizvodaComponent } from './components/tip-proizvoda/tip-proizvoda.component';

const routes: Routes = [
  { path: 'klijent', component: KlijentComponent },   
  { path: 'narudzbina', component: NarudzbinaComponent },
  { path: 'tipProizvoda', component: TipProizvodaComponent },
  { path: 'pocetna', component: HomeComponent },
  { path: 'informacije', component: AboutComponent },
  { path: 'autor', component: AuthorComponent },
  { path: 'svinje', component: SvinjaComponent },
  { path: 'danasnjeTerapije', component: TerapijePoDanuComponent },
  { path: '', redirectTo: '/pocetna', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
