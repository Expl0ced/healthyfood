import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuadrosRecetaService {

  constructor(private firebase: AngularFirestore) { }

  getReceta(): Observable<any>{
    return this.firebase.collection('recetas').snapshotChanges();
  }
}
