import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListaUsersService } from 'src/app/services/lista-users.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  constructor(private _userservice: ListaUsersService, private tostada: ToastrService,
    private router: Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
