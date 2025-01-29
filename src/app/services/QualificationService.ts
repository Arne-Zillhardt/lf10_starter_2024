import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillSetDto} from "../models/SkillSetDto";
import {EmployeeBySkillDto} from "../models/EmployeeBySkillDto";
import {CreateQualificationDto} from "../models/CreateQualificationDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class QualificationService {
  private static readonly baseUrl:string = "http://localhost:8089/qualifications"

  constructor(private readonly client: HttpClient) {
    this.client = inject(HttpClient)
  }

  updateQualification(skillToUpdate: SkillSetDto) {
    return this.client.put(`${QualificationService.baseUrl}/${skillToUpdate.id}`, `{"skill": "${skillToUpdate.skill}"}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  deleteQualification(skillToDeleteId: number) {
    return this.client.delete<SkillSetDto>(`${QualificationService.baseUrl}/${skillToDeleteId}`)
  }

  getQualifications() {
    return this.client.get<SkillSetDto[]>(QualificationService.baseUrl)
  }

  createQualification(skill: CreateQualificationDto): Observable<SkillSetDto> {
    return this.client.post<SkillSetDto>(QualificationService.baseUrl, skill, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getEmployeesByQualification(skillId:number) {
    return this.client.get<EmployeeBySkillDto>(`${QualificationService.baseUrl}/${skillId}/employees`)
  }
}
