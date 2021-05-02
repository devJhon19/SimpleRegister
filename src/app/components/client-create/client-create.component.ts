import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  createClientForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
      this.createClientForm = formBuilder.group(
        {
          name: ['', Validators.required],
          lastName: ['', Validators.required],
          dateBirth: ['', [Validators.required]]
        }
      )
   }

  ngOnInit(): void {
  }

  createClient(){
    this.submitted = true;
    if(this.createClientForm.invalid)
      return;

    const client: any = {
      name: this.createClientForm.value.name,
      lastName: this.createClientForm.value.lastName,
      dateBirth: this.createClientForm.value.dateBirth,
      creationDate: new Date(),
      modificationDate: new Date()
    }

    console.log(client)
  }

}
