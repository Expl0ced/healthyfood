import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comodin',
  templateUrl: './comodin.component.html',
  styleUrls: ['./comodin.component.css']
})
export class ComodinComponent {






  constructor(private activerouter: ActivatedRoute, private router: Router){
    
  }

  usuarioa: any = this.activerouter.snapshot.paramMap.get('id')
  nombrea: any = this.activerouter.snapshot.paramMap.get('nombre')
  apellidoa: any = this.activerouter.snapshot.paramMap.get('apellido')

  ngOnInit(){
    this.reloadPage()
  }

  reloadPage(){
    this.router.navigate(['minuta/:id/:nombre/:apellido'])
  }

}