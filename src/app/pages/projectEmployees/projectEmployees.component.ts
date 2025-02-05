import { Component, inject, OnInit } from '@angular/core';
import { ProjectEmployee } from '../../model/project';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProjectEmployeeService } from './../../services/projectEmployee.service';

@Component({
  selector: 'app-projectEmployees',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './projectEmployees.component.html',
  styleUrls: ['./projectEmployees.component.css'],
})
export class ProjectEmployeesComponent implements OnInit {
  projectEmployeeList: ProjectEmployee[] = [];
  projectEmployee: ProjectEmployee = new ProjectEmployee();

  projectEmployeeService = inject(ProjectEmployeeService);

  currentView = 'List';

  constructor() {}

  ngOnInit() {
    this.getAllProjectEmployees();
  }

  getAllProjectEmployees() {
    this.projectEmployeeService
      .getAllProjectEmployee()
      .subscribe((res: ProjectEmployee[]) => {
        this.projectEmployeeList = res;
      });
  }

  onEdit() {}

  onDelete(id: number) {
    const result = confirm('Are you sure you want to delete this Employee?');
    if (result) {
      this.projectEmployeeService.deleteProjectEmployeeById(id).subscribe(
        (res: ProjectEmployee) => {
          alert('Delete Project Employee Successfully');
          this.getAllProjectEmployees();
        },
        (err) => {
          alert('Delete Project Employee Failed');
        }
      );
    }
  }
}
