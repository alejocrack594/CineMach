import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Agrega esta línea

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DulceriaComponent } from './components/dulceria/dulceria.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { ProximosEstrenosComponent } from './components/proximos-estrenos/proximos-estrenos.component';
import { PasarelaPaymentComponent } from './components/pasarela-payment/pasarela-payment.component';
import { ComprasComponent } from './components/compras/compras.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { SalaCineComponent } from './components/sala-cine/sala-cine.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    MovieDetailsComponent,
    UserProfileComponent,
    LoginComponent,
    DulceriaComponent,
    SeatSelectionComponent,
    CarteleraComponent,
    ProximosEstrenosComponent,
    PasarelaPaymentComponent,
    ComprasComponent,
    CrearUsuarioComponent,
    SalaCineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    QRCodeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
