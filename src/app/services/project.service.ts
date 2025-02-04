import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get<IProject[]>(`${this.apiUrl}GetAllProjects`);
  }

  getProjectById(id: number) {
    return this.http.get<IProject>(`${this.apiUrl}GetProject/` + id);
  }

  createProject(obj: IProject) {
    return this.http.post<IProject>(`${this.apiUrl}CreateProject`, obj);
  }

  updateProject(obj: IProject) {
    return this.http.put<IProject>(
      `${this.apiUrl}UpdateProject/` + obj.projectId,
      obj
    );
  }

  deleteProjectById(id: number) {
    return this.http.delete<IProject>(`${this.apiUrl}DeleteProject/` + id);
  }


}
