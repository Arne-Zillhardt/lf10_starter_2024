import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private keycloak:KeycloakService) {
    this.keycloak = inject(KeycloakService)
  }

  logout() {
    this.keycloak.logout().then()
  }
}
