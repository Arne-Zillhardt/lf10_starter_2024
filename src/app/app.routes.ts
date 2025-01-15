import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './employee-form/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {SkillListComponent} from "./skill-list/skill-list.component";

export const routes: Routes = [
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/edit/:id', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'skills', component: SkillListComponent },
  { path: '', component: EmployeeListComponent }
];
