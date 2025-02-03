import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {QualificationService} from "../services/QualificationService";
import {CreateQualificationDto} from "../models/CreateQualificationDto";
import {SkillSetDto} from "../models/SkillSetDto";
import {EmployeeService} from "../services/EmployeeService";
import {forkJoin, Observable} from "rxjs";
import {EmployeeDto} from "../models/EmployeeDto";

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

  constructor(private qualificationService: QualificationService, private employeeServive: EmployeeService) {
    this.qualificationService = inject(QualificationService)
    this.employeeServive = inject(EmployeeService)
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
    this.qualificationService.getEmployeesByQualification(id).subscribe(result => {
      if (result.employees.length == 0) {
        this.qualificationService.deleteQualification(id).subscribe(() => this.getSkills())
      }

      let requests = result.employees.map(employee=> this.employeeServive.getEmployeeById(employee.id))
      forkJoin(requests).subscribe({
        next: employees=> {
          let employeeUpdateRequest:Observable<EmployeeDto>[] = []
          employees.forEach(employee => {
            employee.skillSet = employee.skillSet.filter(skill => skill.id != id)
            employeeUpdateRequest.push(this.employeeServive.updateEmployee(employee))
          })

          forkJoin(employeeUpdateRequest).subscribe({
            next: value => {
              this.qualificationService.deleteQualification(id).subscribe(() => this.getSkills())
            }
          })
        }
        })
    }
    )
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
