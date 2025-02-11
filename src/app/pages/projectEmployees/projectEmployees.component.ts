import { Component, inject, OnInit } from '@angular/core';
import { ProjectEmployee } from '../../model/project';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProjectEmployeeService } from './../../services/projectEmployee.service';
import { MyTableComponent } from '../../shared/components/my-table/my-table.component';
import { CommonTableColumn, TableColumnType } from '../../model/commonTable';

@Component({
  selector: 'app-projectEmployees',
  imports: [FormsModule, ReactiveFormsModule, MyTableComponent],
  templateUrl: './projectEmployees.component.html',
  styleUrls: ['./projectEmployees.component.css'],
})
export class ProjectEmployeesComponent implements OnInit {
  columnList: CommonTableColumn[] = [
    { fieldId: 'projectName', headerName: 'Project', dataType: TableColumnType.TEXT },
    { fieldId: 'employeeName', headerName: 'Employee', dataType: TableColumnType.TEXT },
    { fieldId: 'isActive', headerName: 'Status', dataType: TableColumnType.BOOLEAN },
    { fieldId: 'role', headerName: 'Role', dataType: TableColumnType.TEXT },
    { fieldId: 'assignedDate', headerName: 'Assigned Date', dataType: TableColumnType.DATE, format: 'dd-MM-yyyy' },
  ];

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

  onDelete(data: any) {
    const result = confirm('Are you sure you want to delete this Employee?');
    if (result) {
      this.projectEmployeeService
        .deleteProjectEmployeeById(data.empProjectId)
        .subscribe(
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
