import {SkillSetDto} from "./SkillSetDto";

export class EmployeeDto {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public street: string,
              public postcode: string,
              public city: string,
              public phone: string,
              public skillSet: SkillSetDto[]
  ) {
  }
}
