import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './employee-form/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import {SkillsComponent} from "./skills/skills.component";

export const routes: Routes = [
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/edit/:id', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: '', component: EmployeesComponent }
];
