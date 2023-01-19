import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoasignService {
  url='/api/archivo/'

  constructor(private http:HttpClient) { }


  getArchivos(idUser:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.get<any>(this.url+idUser,{
        headers:header
      })
  }
}
