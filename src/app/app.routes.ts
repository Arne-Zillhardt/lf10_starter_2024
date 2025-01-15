import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employee/:id', component: AddEmployeeComponent },
  { path: '', component: EmployeeListComponent }
];
