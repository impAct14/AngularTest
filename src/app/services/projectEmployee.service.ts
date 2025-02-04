import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectEmployee } from '../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectEmployeeService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http: HttpClient) {}

  getAllProjectEmployee() {
    return this.http.get<ProjectEmployee[]>(
      `${this.apiUrl}GetAllProjectEmployees`
    );
  }

  getProjectEmployee(id: number) {
    return this.http.get<ProjectEmployee[]>(
      `${this.apiUrl}GetProjectEmployee` + id
    );
  }

  addNewProjectEmployee(obj: ProjectEmployee) {
    return this.http.post<ProjectEmployee>(
      `${this.apiUrl}CreateProjectEmployee`,
      obj
    );
  }
}
