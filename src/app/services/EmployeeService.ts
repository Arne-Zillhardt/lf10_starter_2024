import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeDto} from "../models/EmployeeDto";
import {CreateEmployeeDto} from "../models/CreateEmployeeDto";

@Injectable( {providedIn: 'root'} )
export class EmployeeService {

  private baseUrl: string = 'http://localhost:8089';
  constructor(private httpClient: HttpClient) {
  }

  getEmployees() {
    let url = `${this.baseUrl}/employees`;

    return this.httpClient.get<EmployeeDto[]>(url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      })
  }

  getEmployeeById(id: number) {
    let url = `${this.baseUrl}/employees/${id}`;

    return this.httpClient.get<EmployeeDto>(url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  updateEmployee(employee: EmployeeDto) {
    let url = `${this.baseUrl}/employees/${employee.id}`;

    let skills: number[] = [];

    employee.skillSet.forEach(e => skills.push(e.id));

    let updatedEmployee: CreateEmployeeDto = new CreateEmployeeDto(
      employee.firstName,
      employee.lastName,
      employee.street,
      employee.postcode,
      employee.city,
      employee.phone,
      skills)

    return this.httpClient.put<EmployeeDto>(url, updatedEmployee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe()
  }

  deleteEmployee(id: number) {
    let url = `${this.baseUrl}/employees/${id}`;

    return this.httpClient.delete<EmployeeDto>(url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  createEmployee(employee: CreateEmployeeDto) {
    let url = `${this.baseUrl}/employees`;

    return this.httpClient.post(url, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe()
  }
}
