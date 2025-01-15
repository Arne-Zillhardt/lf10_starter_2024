import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './employee-form/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {SkillListComponent} from "./skill-list/skill-list.component";

export const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'skills', component: SkillListComponent },
  { path: '', component: EmployeeListComponent }
];
