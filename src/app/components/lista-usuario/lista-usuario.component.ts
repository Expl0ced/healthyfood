import { Component, OnInit } from '@angular/core';
import { ListaUsersService } from 'src/app/services/lista-users.service';


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {


  public usuarios:Array<any>=[]

  constructor(private _Userservice: ListaUsersService) { 
  }

  ngOnInit(): void {
    this.verUsers();
  }

  verUsers(){
    this._Userservice.obtenerUsers().subscribe((resp:any)=>{  
      this.usuarios=resp
    });
  }

  borrarUsuario(item:any){
    this._Userservice.deleteUser(item).subscribe((res)=>{
      console.warn("resultado",res); 
      window.location.reload()
    })
    
  }
}
