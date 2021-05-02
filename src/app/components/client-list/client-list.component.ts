import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];

  constructor(private _clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  /**
   * Obtiene todos los clientes registrado en firebase
   */
  getClients() {
    this._clientService.getAll().subscribe((data) => {
      this.clients = [];
      data.forEach((element: any) => {
        var client = element.payload.doc.data()
        this.clients.push({
          id: element.payload.doc.id,
          age: this.calculateAge(client.dateBirth),
          ...client,
        });
      });
      console.log(this.clients);
    });
  }

  /**
   * Calcula la edad según la fecha de nacimiento
   * OJO: Puede estár en un utilitario o en una entidad tipada
   */
  calculateAge(timestamp: Timestamp): String {
    var age = "";
    if(timestamp != null){
      const dateBirth = timestamp.toDate()
      const timeDiff = Math.abs(Date.now() - dateBirth.getTime());
      age = (Math.floor((timeDiff / (1000 * 3600 * 24))/365)).toString();
    }

    return age;
  }
}
