import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillSetDto} from "../models/SkillSetDto";
import {EmployeeBySkillDto} from "../models/EmployeeBySkillDto";

@Injectable({
  providedIn: "root"
})
export class QualificationService {
  private static readonly baseUrl:string = "http://localhost:8089/qualifications"

  constructor(private readonly client: HttpClient) {
    this.client = inject(HttpClient)
  }

  updateQualification(skillToUpdate: SkillSetDto) {
    this.client.put(`${QualificationService.baseUrl}/${skillToUpdate.id}`, `{"skill": "${skillToUpdate.skill}"}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe()
  }

  deleteQualification(skillToDeleteId: number) {
    this.client.delete(`${QualificationService.baseUrl}/${skillToDeleteId}`).subscribe()
  }

  getQualifications() {
    return this.client.get<SkillSetDto[]>(QualificationService.baseUrl)
  }

  createQualification(skill:string) {
    this.client.put(`${QualificationService.baseUrl}`, `{"skill":"${skill}"}`).subscribe()
  }

  getEmployeesByQualification(skillId:number) {
    return this.client.get<EmployeeBySkillDto>(`${QualificationService.baseUrl}/${skillId}/employees`)
  }
}
