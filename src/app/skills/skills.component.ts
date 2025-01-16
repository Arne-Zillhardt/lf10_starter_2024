import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Skill {
  id: number;
  name: string;
  memberCount: number;
  isEditing?: boolean; // Optional für Bearbeiten-Status
}

interface Employee {
  id: number;
  name: string;
  skills: number[]; // IDs der Skills
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  imports: [FormsModule, CommonModule], // FormsModule und CommonModule importieren
})
export class SkillsComponent {
  // Skills-Liste (Beispieldaten)
  skills: Skill[] = [
    { id: 1, name: 'React', memberCount: 0 },
    { id: 2, name: 'Mongo', memberCount: 0 },
    { id: 3, name: 'Java', memberCount: 0 },
    { id: 4, name: 'C#', memberCount: 0 },
    { id: 5, name: 'Golang', memberCount: 0 },
  ];

  // Mitarbeiter-Liste (Beispieldaten)
  employees: Employee[] = [
    { id: 1, name: 'Alice', skills: [1, 3] },
    { id: 2, name: 'Bob', skills: [1, 2] },
    { id: 3, name: 'Charlie', skills: [3, 4, 5] },
    { id: 4, name: 'Diana', skills: [1, 5] },
  ];

  newSkillName: string = ''; // Für neue Skill-Eingaben

  constructor() {
    this.updateMemberCounts(); // Mitgliederanzahl initial berechnen
  }

  // Mitgliederanzahl automatisch berechnen
  updateMemberCounts(): void {
    this.skills.forEach((skill) => {
      skill.memberCount = this.employees.filter((employee) =>
        employee.skills.includes(skill.id)
      ).length;
    });
  }

  // Skill hinzufügen
  addSkill(): void {
    const newSkill: Skill = {
      id: this.skills.length + 1,
      name: this.newSkillName.trim(),
      memberCount: 0,
      isEditing: false, // Standard: Nicht im Bearbeitungsmodus
    };
    if (newSkill.name) {
      this.skills.push(newSkill);
      this.newSkillName = ''; // Eingabe zurücksetzen
      this.updateMemberCounts();
    }
  }

  // Bearbeiten eines Skills starten
  editSkill(skill: Skill): void {
    skill.isEditing = true;
  }

  // Bearbeiten speichern
  saveSkill(skill: Skill): void {
    skill.isEditing = false;
  }

  // Bearbeiten abbrechen
  cancelEdit(skill: Skill): void {
    skill.isEditing = false;
  }

  // Skill löschen
  deleteSkill(skillId: number): void {
    this.skills = this.skills.filter((skill) => skill.id !== skillId);
    this.employees.forEach((employee) => {
      employee.skills = employee.skills.filter((id) => id !== skillId);
    });
    this.updateMemberCounts();
  }
}
