import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d\s]+$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
