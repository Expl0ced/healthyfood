import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comodin',
  templateUrl: './comodin.component.html',
  styleUrls: ['./comodin.component.css']
})
export class ComodinComponent {






  constructor(private activerouter: ActivatedRoute){
    
  }

  usuarioa: any = this.activerouter.snapshot.paramMap.get('id')
  nombrea: any = this.activerouter.snapshot.paramMap.get('nombre')
  apellidoa: any = this.activerouter.snapshot.paramMap.get('apellido')
}
