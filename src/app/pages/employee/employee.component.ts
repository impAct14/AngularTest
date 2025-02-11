import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Employee,
  IApiResponse,
  IChildDept,
  IParentDept,
} from '../../model/employee';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MyTableComponent } from '../../shared/components/my-table/my-table.component';
import { CommonTableColumn, TableColumnType } from '../../model/commonTable';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, MyTableComponent],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  columnList: CommonTableColumn[] = [
    { fieldId: 'employeeName', headerName: 'Employee Name', dataType: TableColumnType.TEXT },
    { fieldId: 'contactNo', headerName: 'Contact No', dataType: TableColumnType.NUMBER },
    { fieldId: 'emailId', headerName: 'Email', dataType: TableColumnType.TEXT },
    { fieldId: 'deptId', headerName: 'Department', dataType: TableColumnType.TEXT },
  ];
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  deptId: number = 0;

  employees: Employee = new Employee();
  employeeList: Employee[] = [];

  isSidePanelOpen = signal<boolean>(false);

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);

  ngOnInit() {
    this.getParentDeptList();
    this.getEmployees();
  }

  getParentDeptList() {
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parentDeptList = res.data;
    });
  }

  onDeptChange() {
    this.masterService
      .getChildDeptByParentId(this.deptId)
      .subscribe((res: IApiResponse) => {
        this.childDeptList = res.data;
      });
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.employeeList = res;
    });
  }
  onSaveEmployee() {
    this.employeeService.createNewEmployee(this.employees).subscribe(
      (res: Employee) => {
        alert('Create Employee Successfully');
        this.getEmployees();
      },
      (err) => {
        alert('Create Employee Failed');
      }
    );
  }

  addNewEmployee() {
    this.isSidePanelOpen.set(true);
  }

  onCloseAddNewEmployee() {
    this.isSidePanelOpen.set(false);
  }

  onEdit(obj: Employee) {
    this.isSidePanelOpen.set(true);
    this.employees = obj;
  }

  onUpdateEmployee() {
    this.employeeService.updateEmployee(this.employees).subscribe(
      (res: Employee) => {
        alert('Update Employee Success.');
        this.getEmployees();
      },
      (err) => {
        alert('Update Employee Failed.');
      }
    );
  }

  onDelete(data: any) {
    const result = confirm('Are you sure you want to delete this Employee?');
    if (result) {
      this.employeeService.deteleEmployeeById(data.employeeId).subscribe(
        (res: Employee) => {
          alert('Delete Employee Successfully');
          this.getEmployees();
        },
        (err) => {
          alert('Delete Employee Failed');
        }
      );
    }
  }
}
