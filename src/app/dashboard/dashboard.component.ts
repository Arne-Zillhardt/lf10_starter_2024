import {Component, inject} from '@angular/core';
import {SkillDisplay} from "./SkillDisplay";
import {QualificationService} from "../services/QualificationService";
import {forkJoin, from} from "rxjs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  first: SkillDisplay
  second: SkillDisplay
  third: SkillDisplay

  constructor(private service: QualificationService) {
    this.service = inject(QualificationService)
    this.first = new SkillDisplay("", 0)
    this.second = new SkillDisplay("", 0)
    this.third = new SkillDisplay("", 0)

    this.fillSkillDisplay()
  }

  fillSkillDisplay() {
    this.service.getQualifications().subscribe(skills =>{
      const apiCalls = skills.map(skill => this.service.getEmployeesByQualification(skill.id))
      forkJoin(apiCalls).subscribe({
        next: result => {
          let skillDisplays: SkillDisplay[] = []
          for (const res of result) {
            skillDisplays.push(new SkillDisplay(res.qualification.skill, res.employees.length))
          }
          const sortedSkill = this.sortIntoSkills(skillDisplays)

          if (sortedSkill.length >= 1) {
            let first = sortedSkill[(sortedSkill.length - 1)]
            this.first.skillName = first.skillName
            this.first.numberOfPeople = first.numberOfPeople
          }
          if (sortedSkill.length >= 2) {
            let second= sortedSkill[(sortedSkill.length - 2)]
            this.second.skillName = second.skillName
            this.second.numberOfPeople = second.numberOfPeople
          }
          if (sortedSkill.length >= 3) {
            let third = sortedSkill[(sortedSkill.length - 3)]
            console.log(third)
            console.log(third.numberOfPeople)
            this.third.skillName = third.skillName
            this.third.numberOfPeople = third.numberOfPeople
          }
        }
      })
    })
  }

  sortIntoSkills(skills: SkillDisplay[]):SkillDisplay[]{
    if (skills.length <= 1) {
      return skills
    }

    const middleValue = skills[0]
    const smallerPartition = this.partitionSmaller(middleValue.numberOfPeople, skills)
    const biggerPartition= this.partitionBigger(middleValue.numberOfPeople, skills)

    const sortedSmaller = this.sortIntoSkills(smallerPartition)
    const sortedBigger = this.sortIntoSkills(biggerPartition)
    sortedSmaller.push(middleValue)

    for (let i = 0; i < sortedBigger.length; i++) {
      sortedSmaller.push(biggerPartition[i])
    }

    return sortedSmaller
  }

  partitionSmaller(middle:number, skills:SkillDisplay[]):SkillDisplay[]{
    let smaller:SkillDisplay[] = []
    let foundMiddle = false
    for (const skill of skills) {
      if (skill.numberOfPeople == middle) {
        if (!foundMiddle) {
          foundMiddle = true
          continue
        }

        smaller.push(skill)
      }
      if (skill.numberOfPeople < middle) {
        smaller.push(skill)
      }
    }

    return smaller
  }

  partitionBigger(middle:number, skills:SkillDisplay[]):SkillDisplay[]{
    let bigger:SkillDisplay[] = []
    for (const skill of skills) {
      if (skill.numberOfPeople > middle) {
        bigger.push(skill)
      }
    }

    return bigger
  }
}
