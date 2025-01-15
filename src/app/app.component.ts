import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {AddEmployeeComponent} from "./employee-form/add-employee.component";
import {SidebarComponent} from "./elements/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, AddEmployeeComponent, RouterOutlet, RouterLink, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
