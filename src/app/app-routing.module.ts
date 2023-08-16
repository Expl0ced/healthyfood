import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecetaComponent } from './components/receta/receta.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { CuadrosComponent } from './components/cuadros/cuadros.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { OrdenNutriComponent } from './components/orden-nutri/orden-nutri.component';
import { ListadoPacientesComponent } from './components/listado-pacientes/listado-pacientes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SubirPDFComponent } from './components/subir-pdf/subir-pdf.component';
import { SubirRecetaComponent } from './components/subir-receta/subir-receta.component';
import { MinutaComponent } from './components/minuta/minuta.component';
import { ArchivosubidoComponent } from './components/archivosubido/archivosubido.component';
import { InicioComponent } from './components/inicio/inicio.component';
import * as path from 'path';
import { ComodinComponent } from './components/comodin/comodin.component';
import { RecetasGuardadasComponent } from './components/recetas-guardadas/recetas-guardadas.component';
import { EditarPacienteComponent } from './components/editar-paciente/editar-paciente.component';
import { RegistroNutriaComponent } from './components/registro-nutria/registro-nutria.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recetas', component: RecetasComponent, canActivate: [AuthGuard], data: { expectedRole: ['usuario', 'admin', 'nutricionista'] } },
  { path: 'recetas/:id', component: RecetaComponent, canActivate: [AuthGuard], data: { expectedRole: ['usuario', 'admin', 'nutricionista'] } },
  { path: 'registrarse', component: UsuarioComponent },
  { path: 'registro', component: ListaUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'cuadro', component: CuadrosComponent, canActivate: [AuthGuard], data: { expectedRole: ['usuario', 'nutricionista'] } },
  { path: 'orden', component: OrdenNutriComponent, canActivate: [AuthGuard], data: { expectedRole: 'nutricionista' } },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { expectedRole: 'usuario' } },
  { path: 'listado_pacientes', component: ListadoPacientesComponent, canActivate: [AuthGuard], data: { expectedRole: 'nutricionista' } },
  { path: 'archivoUP', component: SubirPDFComponent },
  { path: 'upreceta', component: SubirRecetaComponent, canActivate: [AuthGuard], data: { expectedRole: ['nutricionista', 'admin'] } },
  { path: 'minuta/:id/:nombre/:apellido', component: MinutaComponent, canActivate: [AuthGuard], data: { expectedRole: ['nutricionista', 'admin'] } },
  { path: 'archivos_asignados', component: ArchivosubidoComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'comodin/:id/:nombre/:apellido', component: ComodinComponent, canActivate: [AuthGuard], data: { expectedRole: ['nutricionista', 'admin'] } },
  {path: 'editar_paciente/:id', component: EditarPacienteComponent, canActivate: [AuthGuard], data: { expectedRole: ['nutricionista', 'admin']} },
  {path: 'registro_nutri', component:RegistroNutriaComponent},
  {path:'Favoritas', component:RecetasGuardadasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
