import { Component } from '@angular/core';

@Component({
  selector: 'app-form-skill-selector',
  standalone: true,
  imports: [

  ],
  templateUrl: './form-skill-selector.component.html',
  styleUrl: './form-skill-selector.component.css'
})
export class FormSkillSelectorComponent {
  selectedSkills: string[] = ['PHP', 'Perl', 'Pascal'];
}
