import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';

import { DulceriaComponent } from './components/dulceria/dulceria.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { ProximosEstrenosComponent } from './components/proximos-estrenos/proximos-estrenos.component';
import { PasarelaPaymentComponent } from './components/pasarela-payment/pasarela-payment.component';
import { ComprasComponent } from './components/compras/compras.component';
import { LoginGuardianService } from './components/login-guardian.service';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { SalaCineComponent } from './components/sala-cine/sala-cine.component';

//{path: '',redirectTo: 'homepage', pathMatch: 'full'}

const routes: Routes = [
  {path: '',redirectTo: 'login', pathMatch: 'full'},
  {path:'homepage', component: HomepageComponent},
  {path:'movie-details/:id',component:MovieDetailsComponent},
  {path:'user-profile', component:UserProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:CrearUsuarioComponent},
  {path:'dulceria',component:DulceriaComponent},
  {path: 'sala',component: SalaCineComponent},
  {path:'seat-selection',component:SeatSelectionComponent},
  {path:'cartelera', component:CarteleraComponent},
  {path:'proximos-estrenos', component:ProximosEstrenosComponent},
  {path:'pasarela-payment', component:PasarelaPaymentComponent},
  {path:'compras', component:ComprasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
