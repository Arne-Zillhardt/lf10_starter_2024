import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {QualificationService} from "../services/QualificationService";
import {CreateQualificationDto} from "../models/CreateQualificationDto";
import {SkillSetDto} from "../models/SkillSetDto";

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  imports: [FormsModule, CommonModule], // FormsModule und CommonModule importieren
})
export class SkillsComponent {

  public skills: SkillSetDto[] = [];
  newSkillName: string = '';
  editSkill: SkillSetDto;
  skillCounts: Map<number, number> = new Map();

  constructor(private qualificationService: QualificationService) {
    this.qualificationService = inject(QualificationService)
    this.getSkills()
  }

  getSkills() {
    this.skills = [];
    this.qualificationService.getQualifications().subscribe(skills => {skills.forEach(skill => {this.skills.push(skill)}); this.countSkillMembers();})
  }

  // Skill hinzufügen
  addSkill() {
    let skill = new CreateQualificationDto(this.newSkillName)

    this.qualificationService.createQualification(skill).subscribe(() => this.getSkills())
  }

  deleteSkill(id: number) {
    this.qualificationService.deleteQualification(id).subscribe(() => this.getSkills())
  }

  edit(skill: SkillSetDto) {
    this.editSkill = skill;
  }

  saveSkill(){
    this.qualificationService.updateQualification(this.editSkill).subscribe(() => this.getSkills())
    this.editSkill = null;
  }

  cancelEdit(){
    this.editSkill = null;
  }

  isToEdit(skill: SkillSetDto): boolean {
    if (!this.editSkill)
    {
      return false;
    }
    else if(this.editSkill !== skill)
    {
      return false;
    }

    return true;
  }

  countSkillMembers() {
    for (let skill of this.skills){
      this.qualificationService.getEmployeesByQualification(skill.id).subscribe(employee => {this.skillCounts.set(skill.id, employee.employees.length); console.log(this.skillCounts)})
    }
  }
}
