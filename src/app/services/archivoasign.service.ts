import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoasignService {
  url='/api/archivo/'
  path:any='C:/Users/explo/app tesis/healthyfood/src/'
  constructor(private http:HttpClient) { }


  getArchivos(idUser:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      return this.http.get<any>(this.url+idUser,{
        headers:header
      })  
  }
  enviarDatos(data: any):Observable<any> {
    const url = 'http://localhost:3300/download';
    return this.http.post(url, data);
  }
}
