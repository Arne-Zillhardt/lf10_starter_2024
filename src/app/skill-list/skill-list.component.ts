import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css'
})
export class SkillListComponent {
  data = [
    { id: 1, name: 'Bitte neuen Namen eingeben...', mitgliederanzahl: 10, isEditing: false },
    { id: 2, name: 'React', mitgliederanzahl: 6, isEditing: false },
    { id: 3, name: 'Mongo', mitgliederanzahl: 0, isEditing: false },
    { id: 4, name: 'Java', mitgliederanzahl: 24, isEditing: false },
    { id: 5, name: 'C#', mitgliederanzahl: 1, isEditing: false },
    { id: 6, name: 'Golang', mitgliederanzahl: 1, isEditing: false },
  ];

  bearbeiten(item: any) {
    item.isEditing = true;
  }

  speichern(item: any) {
    item.isEditing = false;
  }

  abbrechen(item: any) {
    item.isEditing = false;
  }

  loeschen(id: any) {
    this.data = this.data.filter(item => item.id !== id);
  }

}
