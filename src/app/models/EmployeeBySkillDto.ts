import {SkillSetDto} from "./SkillSetDto";
import {GetEmployeeBySkillDto} from "./GetEmployeeBySkillDto";

export class EmployeeBySkillDto {
  constructor(qualification: SkillSetDto, employees: GetEmployeeBySkillDto[]) {
  }
}
