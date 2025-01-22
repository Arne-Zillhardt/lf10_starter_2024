import {SkillSetDto} from "./SkillSetDto";
import {GetEmployeeBySkillDto} from "./GetEmployeeBySkillDto";

export class EmployeeBySkillDto {
  constructor(public qualification: SkillSetDto, public employees: GetEmployeeBySkillDto[]) {
  }
}
