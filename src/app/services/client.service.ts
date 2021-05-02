import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Agregar un cliente
   * @param client
   * @returns
   */
  add(client: any): Promise<any> {
    return this.firestore.collection('Clients').add(client);
  }

  /**
   * Obtiene todos los clientes ordenados por la fecha de creación
   * @returns
   */
  getAll(): Observable<any> {
    return this.firestore.collection('Clients', ref => ref.orderBy('creationDate')).snapshotChanges();
  }
}
