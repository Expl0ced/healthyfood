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
    Peso_Anterior: 0,
    Peso_Anterior2: 0,
    Altura: 0,
    IMC: 0,
    IMC_Anterior:0,
    IMC_Anterior2:0,
    Contex_Fisica:'',
    Genero: ''
  }



  constructor(private activerouter: ActivatedRoute, private router: Router, private usuario: ListaUsersService) {

  }

  usuarioa: any = this.activerouter.snapshot.paramMap.get('id')
  nombrea: any = this.activerouter.snapshot.paramMap.get('nombre')
  apellidoa: any = this.activerouter.snapshot.paramMap.get('apellido')

  ngOnInit() {
    this.reloadPage()
    this.obtenerUser()
  }

  reloadPage() {
    setTimeout(() => {
      this.router.navigate(['minuta/'+this.usuarioa+'/'+this.nombrea+'/'+this.apellidoa+''])
    }, 1000);
    
  }
  obtenerUser() {
    this.usuario.getusuario(this.usuarioa).subscribe((res: any) => {
      this.user = res
      localStorage.setItem('Peso', this.user.Peso.toString())
      localStorage.setItem('PesoA', this.user.Peso_Anterior.toString())
      localStorage.setItem('PesoA2', this.user.Peso_Anterior2.toString())

      localStorage.setItem('IMC', this.user.IMC.toString())
      localStorage.setItem('IMCA', this.user.IMC_Anterior.toString())
      localStorage.setItem('IMCA2', this.user.IMC_Anterior2.toString())
    })
  }

}