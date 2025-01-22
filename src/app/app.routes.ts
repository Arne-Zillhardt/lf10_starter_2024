import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeesComponent } from './employees/employees.component';
import {SkillsComponent} from "./skills/skills.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'employees/add', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: '', component: DashboardComponent}
];
