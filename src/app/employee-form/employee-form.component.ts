import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {FormSkillSelectorComponent} from "../elements/form-skill-selector/form-skill-selector.component";
import {EmployeeService} from "../services/EmployeeService";
import {EmployeeDto} from "../models/EmployeeDto";
import { Router } from '@angular/router';
import {CreateEmployeeDto} from "../models/CreateEmployeeDto";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormSkillSelectorComponent
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  employeeId: any;
  employeeDto: EmployeeDto = {} as EmployeeDto;
  isEditMode: boolean = false;

  constructor(
      private employeeService: EmployeeService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d\s]+$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') === null) {
        this.isEditMode = false;
      } else {
        this.isEditMode = true;
        this.employeeId = params.get('id');
        this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
          this.employeeDto = employee;
          this.form.patchValue(employee);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {

      if(this.isEditMode){
        this.employeeService.updateEmployee(this.employeeDto).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }else{
        let skills: number[] = [];

        this.employeeDto.skillSet.forEach(e => skills.push(e.id));

        let updatedEmployee: CreateEmployeeDto = new CreateEmployeeDto(
          this.employeeDto.firstName,
          this.employeeDto.lastName,
          this.employeeDto.street,
          this.employeeDto.postcode,
          this.employeeDto.city,
          this.employeeDto.phone,
          skills);

        this.employeeService.createEmployee(updatedEmployee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }


    } else {
      console.log('Form is invalid');
    }
  }
}
