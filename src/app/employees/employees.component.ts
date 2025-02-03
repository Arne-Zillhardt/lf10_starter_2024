import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {map, Observable} from "rxjs";
import {EmployeeDto} from "../models/EmployeeDto";
import {EmployeeService} from "../services/EmployeeService";
import {FormsModule} from "@angular/forms";
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  public employees$: Observable<EmployeeDto[]>
  public qualification: string = ""

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.employeeService = inject(EmployeeService)
    this.employees$ = new Observable<EmployeeDto[]>()
    this.getEmployees();
  }
  getEmployees() {
    this.employees$ = this.employeeService.getEmployees()
  }

  filterEmployees()
  {
    return this.employees$ = this.employees$.pipe(
      map(employees =>
      {
        return employees.filter(employee => {
          for (let skill of employee.skillSet) {
            if (skill.skill.toLowerCase().includes(this.qualification.toLowerCase())) {
              return employee
            }
          }
          return null
        })
      }))
  }

  deleteEmployee(id: number)
  {
    this.employeeService.deleteEmployee(id).subscribe(() => { this.getEmployees() })
  }

  navigateToEdit() {
    this.router.navigate(['/employees/edit', 1])
  }
}
