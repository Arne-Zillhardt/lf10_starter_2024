import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FormSkillSelectorComponent} from "../elements/form-skill-selector/form-skill-selector.component";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormSkillSelectorComponent
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') === null) {
        this.isEditMode = false;
      } else {
        this.isEditMode = true;
      }
    });
  }
}
