import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IApiResponse } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http.get<Employee[]>(`${this.apiUrl}GetAllEmployees`);
  }

  createNewEmployee(obj: Employee) {
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee/`, obj);
  }

  updateEmployee(obj: Employee) {
    return this.http.put<Employee>(
      `${this.apiUrl}UpdateEmployee/` + obj.employeeId,
      obj
    );
  }

  deteleEmployeeById(id: number) {
    return this.http.delete<Employee>(`${this.apiUrl}DeleteEmployee/` + id);
  }
}
