import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  
//componentes   
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RecetaComponent } from './components/receta/receta.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { OrdenNutriComponent } from './components/orden-nutri/orden-nutri.component';
import { CuadrosComponent } from './components/cuadros/cuadros.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { ListadoPacientesFormComponent } from './components/listado-pacientes-form/listado-pacientes-form.component';
import { SubirPDFComponent } from './components/subir-pdf/subir-pdf.component';
//providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ModificarUserService } from './services/modificar-user.service';
import { TokenintercepterService } from './services/tokenintercepter.service';
import { SubirRecetaComponent } from './components/subir-receta/subir-receta.component';
import { MinutaComponent } from './components/minuta/minuta.component';
import { ArchivosubidoComponent } from './components/archivosubido/archivosubido.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { ComodinComponent } from './components/comodin/comodin.component';
import { RecetasGuardadasComponent } from './components/recetas-guardadas/recetas-guardadas.component';



const shareProp = {
  facebook: {
    icon: ['fab', 'facebook-square']
  },
  twitter:{
    icon:['fab', 'square-twitter']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecetasComponent,
    RecetaComponent,
    LoginComponent,
    UsuarioComponent,
    ListaUsuarioComponent,
    OrdenNutriComponent,
    CuadrosComponent,
    PerfilComponent,
    ListadoPacientesComponent,
    ListadoPacientesFormComponent,
    SubirPDFComponent,
    SubirRecetaComponent,
    MinutaComponent,
    ArchivosubidoComponent,
    InicioComponent,
    ComodinComponent,
    RecetasGuardadasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
    }), // ToastrModule added
    NgxFileDropModule,
    ShareModule,
    FontAwesomeModule,
    ShareButtonsModule.withConfig({ prop: shareProp }),
    AgGridModule,
    AgChartsAngularModule,
    ColorPickerModule,
    NgChartsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ModificarUserService,
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenintercepterService, multi: true },
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

}
