import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeDto } from "../../models/EmployeeDto";
import { SkillSetDto } from "../../models/SkillSetDto";
import { QualificationService } from "../../services/QualificationService";

@Component({
  selector: 'app-form-skill-selector',
  standalone: true,
  imports: [],
  templateUrl: './form-skill-selector.component.html',
  styleUrls: ['./form-skill-selector.component.css']
})
export class FormSkillSelectorComponent implements OnInit, OnChanges {
  allSkills: SkillSetDto[] = [];
  filteredSkillList: SkillSetDto[] = [];
  @Input('employeeDto') employeeDto: EmployeeDto | undefined;

  constructor(private qualificationService: QualificationService) {}

  ngOnInit() {
    this.qualificationService.getQualifications().subscribe(skills => {
      this.allSkills = skills;
      this.filterSkills(); // Initial filtering
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeDto'] && !changes['employeeDto'].firstChange) {
      this.filterSkills();
    }
  }

  filterSkills() {
    if (this.employeeDto?.skillSet) {
      const employeeSkills = new Set(this.employeeDto.skillSet.map(skill => skill.id));
      this.filteredSkillList = this.allSkills.filter(skill => !employeeSkills.has(skill.id));
    } else {
      this.filteredSkillList = this.allSkills;
    }

    const searchValue = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    this.filteredSkillList = this.filteredSkillList.filter(skill =>
        skill.skill.toLowerCase().includes(searchValue)
    );
  }

  removeSkillFromEmployee(id: number) {
    if (this.employeeDto) {
      this.employeeDto.skillSet = this.employeeDto.skillSet.filter(item => item.id !== id);
      this.filterSkills();
    }
  }

  addSkillToEmployee(id: number) {
    const skill = this.allSkills.find(skill => skill.id === id);

    if (skill && this.employeeDto) {
      if (!this.employeeDto.skillSet) {
        this.employeeDto.skillSet = [];
      }
      this.employeeDto.skillSet.push(skill);
      (document.getElementById('searchInput') as HTMLInputElement).value = "";
      this.filterSkills();
    }
  }
}
