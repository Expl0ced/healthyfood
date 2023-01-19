import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {


  url='/api/avatar'
  constructor(private http:HttpClient) { }

  postImg(img:any):Observable<any>{
    let header = new HttpHeaders()
      .set('Type-content', 'multipart/form-data')
    return this.http.post<any>(this.url, img, {
      headers:header
    });
  }

  getImg(id:number):Observable<any>{
    let header = new HttpHeaders()
      .set('Type-content', 'multipart/form-data')
      return this.http.get<any>(this.url+'/'+id,)
  }


}
