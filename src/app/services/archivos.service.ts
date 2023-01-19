import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  url = 'http://localhost:3200/upload';
  url2 = 'http://localhost:3300/';
  imagenes:any=""

  constructor(private http: HttpClient) { }

  sendPost(body: FormData): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'multipart/form-data')
    return this.http.post(this.url, body, {
      headers: header
    })
  }

  getImg(id: number): Observable<any> {
    return this.http.get<any>(this.url2 + id)
  }

  getfile():Observable<any>{
    return this.http.get<any>(this.url2+"upload")
  }

}
