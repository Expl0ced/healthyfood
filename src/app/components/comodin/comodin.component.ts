import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaUsersService } from 'src/app/services/lista-users.service';

@Component({
  selector: 'app-comodin',
  templateUrl: './comodin.component.html',
  styleUrls: ['./comodin.component.css']
})
export class ComodinComponent {

  nombre: any = localStorage.getItem('Nombre');
  apellido: any = localStorage.getItem('Apellido');
  userid: any = localStorage.getItem('idUser');
  rol: any = localStorage.getItem('Rol')
  user = {
    idUser: 0,
    Nombre: "",
    Apellido: "",
    Rol: "",
    Email: "",
    Password: "",
    Sintomas: "",
    Img: "",
    Asignado: "",
    Peso: 0,
    Altura: 0,
    IMC: 0,
    Contex_Fisica: '',
    Genero: ''
  }



  constructor(private activerouter: ActivatedRoute, private router: Router, private usuario: ListaUsersService) {

  }

  usuarioa: any = this.activerouter.snapshot.paramMap.get('id')
  nombrea: any = this.activerouter.snapshot.paramMap.get('nombre')
  apellidoa: any = this.activerouter.snapshot.paramMap.get('apellido')

  peso_hist: any = []
  recordPeso: any = []
  imc_hist: any = []

  ngOnInit() {
    this.obtenerUser()
    this.obtenerPeso_historico()
    this.obtenerIMC_historico()
    this.reloadPage()
  }

  reloadPage() {
    setTimeout(() => {
      this.router.navigate(['minuta/' + this.usuarioa + '/' + this.nombrea + '/' + this.apellidoa + ''])
    }, 1000);

  }
  obtenerUser() {
    this.usuario.getusuario(this.usuarioa).subscribe((res: any) => {
      this.user = res
    })
  }
  obtenerPeso_historico() {
    this.usuario.getPeso_hist(this.usuarioa).subscribe((res: any) => {
      this.peso_hist = res;
      localStorage.setItem('datosPesoHistorico', JSON.stringify(this.peso_hist));

      const datosPesoHistoricoStr = localStorage.getItem('datosPesoHistorico');
      if (datosPesoHistoricoStr !== null) {
        const datosPesoHistorico = JSON.parse(datosPesoHistoricoStr);
        const datosPesoHistoricoCadena = JSON.stringify(datosPesoHistorico).split(",");
        const datosPesoLimpio = datosPesoHistoricoCadena.map((cadena:any) => cadena.replace("{\"peso\":", "").replace('[','').replace('}','').replace(']',''));
        const datosencadena=datosPesoLimpio.toString()
        localStorage.setItem('datosPesoHistorico',datosencadena)





        // Obtener solo los valores del Peso como un array
        const valoresPeso: any = datosPesoHistorico
        // Filtrar los valores de peso nulos (si es necesario)
        const valoresPesoFiltrados: number[] = valoresPeso.filter((peso: number | null) => peso !== null);

        console.log(valoresPesoFiltrados);
      } else {
        console.log('No se encontraron datos históricos de peso en el localStorage');
      }
    });
  }
  obtenerIMC_historico() {
    this.usuario.getIMC_hist(this.usuarioa).subscribe((res: any) => {
      this.imc_hist = res
      localStorage.setItem('datosIMCHistorico', JSON.stringify(this.imc_hist));


      const datosIMCHistoricoStr = localStorage.getItem('datosIMCHistorico');
      if (datosIMCHistoricoStr !== null) {
        const datosIMCHistorico = JSON.parse(datosIMCHistoricoStr);

        // Obtener solo los valores del IMC como un array
        const valoresIMC: any = datosIMCHistorico.map((item: any) => item.IMC);
        localStorage.setItem('datosIMCHistorico', valoresIMC)
        console.log(valoresIMC);
      } else {
        console.log('No se encontraron datos históricos del IMC en el localStorage');
      }
    });
  }
}