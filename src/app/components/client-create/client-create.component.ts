import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {
  createClientForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private _clientService: ClientService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createClientForm = formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dateBirth: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  /**
   * Crea un cliente que sea válido
   */
  createClient() {
    this.submitted = true;

    if (this.createClientForm.invalid) return;

    const client: any = {
      name: this.createClientForm.value.name,
      lastName: this.createClientForm.value.lastName,
      dateBirth: new Date(this.createClientForm.value.dateBirth),
      creationDate: new Date(),
      modificationDate: new Date(),
    };

    this.loading = true;

    this._clientService
      .add(client)
      .then(() => {
        this.toastr.success(
          'El cliente fue registrado con exito!',
          'Cliente Registrado'
        );
        this.router.navigate(['client-list']);
      })
      .catch((error) => {
        this.toastr.error(
          'El cliente no fue registrado, vuelva a intentarlo nuevamente',
          '¡Ups! Ocurrió Algo'
        );
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
