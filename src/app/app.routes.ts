import { Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {SkillsComponent} from "./skills/skills.component";

export const routes: Routes = [
  { path: '', redirectTo: '/skills', pathMatch: 'full' }, // Standardroute
  { path: 'skills', component: SkillsComponent },         // Route für Skills
  { path: 'employees', component: EmployeeListComponent } // Route für Employees
];
