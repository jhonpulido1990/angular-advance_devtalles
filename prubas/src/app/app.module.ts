import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicoComponent } from './intermedio2/medico/medico.component';
import { HospitalComponent } from './intermedio2/hospital/hospital.component';
import { IncrementadorComponent } from './intermedio2/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './avanzado/navbar/navbar.component';
import { RoutermedicoComponent } from './avanzado/routermedico/routermedico.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
    RoutermedicoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
