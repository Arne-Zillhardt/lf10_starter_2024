import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {map, Observable} from "rxjs";
import {EmployeeDto} from "../models/EmployeeDto";
import {EmployeeService} from "../services/EmployeeService";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  public employees$: Observable<EmployeeDto[]>

  constructor(private employeeService: EmployeeService) {
    this.employeeService = inject(EmployeeService)
    this.employees$ = new Observable<EmployeeDto[]>()
    this.getEmployees()
  }

  getEmployees() {
    this.employees$ = this.employeeService.getEmployees()
  }
}
