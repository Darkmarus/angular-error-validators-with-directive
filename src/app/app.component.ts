import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.loadForm();
  }

  loadForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  sendForm(event: any) {
    if(this.myForm.valid){
      
    }

    console.log(
      '🚀 ~ file: app.component.ts ~ line 29 ~ AppComponent ~ sendForm ~ this.myForm.valid',
      this.myForm.valid
    );
  }
}
