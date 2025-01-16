import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {EmployeesComponent} from "./employees/employees.component";
import {SidebarComponent} from "./elements/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeesComponent, RouterOutlet, RouterLink, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
}
