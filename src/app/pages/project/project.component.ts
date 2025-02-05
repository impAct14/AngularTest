import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IProject, ProjectEmployee } from '../../model/project';
import { MasterService } from '../../services/master.service';
import { from, Observable } from 'rxjs';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProjectEmployeeService } from '../../services/projectEmployee.service';

@Component({
  selector: 'app-project',
  imports: [FormsModule, ReactiveFormsModule, NgFor, AsyncPipe, DatePipe],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @ViewChild('MyModal') employeeModal: ElementRef | undefined;

  currentView: string = 'List';

  projectList: IProject[] = [];
  projectEmployeeList: ProjectEmployee[] = [];
  projectEmployee: ProjectEmployee = new ProjectEmployee();
  projectForm: FormGroup = new FormGroup({});

  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  projectService = inject(ProjectService);
  ProjectEmployeeService = inject(ProjectEmployeeService);

  constructor() {
    this.initializeForm();
    this.employeeData$ = this.employeeService.getAllEmployees();
  }

  initializeForm(project?: IProject) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId : 0),
      projectName: new FormControl(project ? project.projectName : ''),
      clientName: new FormControl(project ? project.clientName : ''),
      startDate: new FormControl(project ? project.startDate : ''),
      leadByEmpId: new FormControl(project ? project.leadByEmpId : ''),
      contactPerson: new FormControl(project ? project.contactPerson : ''),
      contactNo: new FormControl(project ? project.contactNo : ''),
      emailId: new FormControl(project ? project.emailId : ''),
      employeeName: new FormControl(project ? project.employeeName : ''),
    });

    this.currentView = project ? 'Create' : 'List';
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((res: IProject[]) => {
      this.projectList = res;
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    if (formValue.projectId == 0) {
      this.projectService.createProject(formValue).subscribe(
        (res: IProject) => {
          alert('Project Created Successfully');
          this.getAllProjects();
        },
        (err) => {
          alert('Project Creation Failed');
        }
      );
    } else {
      this.projectService.updateProject(formValue).subscribe(
        (res: IProject) => {
          alert('Project Updated Successfully');
          this.getAllProjects();
        },
        (err) => {
          alert('Project Updation Failed');
        }
      );
    }
  }

  onEdit(projectData: IProject) {
    this.initializeForm(projectData);
  }

  onViewEmployees(id: number) {
    this.getAllProjectEmployee(id);

    this.projectEmployee.projectId = id;
    if (this.employeeModal) {
      this.employeeModal.nativeElement.style.display = 'block';
      document.body.classList.add('blur-background');
    }
  }

  closeModal() {
    if (this.employeeModal) {
      this.employeeModal.nativeElement.style.display = 'none';
      document.body.classList.remove('blur-background');
    }
  }

  getAllProjectEmployee(id: number) {
    this.ProjectEmployeeService.getAllProjectEmployee().subscribe(
      (res: ProjectEmployee[]) => {
        const record = res.filter((m) => m.projectId == id);
        this.projectEmployeeList = record;
      }
    );
  }

  onAddEmp() {
    this.ProjectEmployeeService.addNewProjectEmployee(
      this.projectEmployee
    ).subscribe(
      (res: ProjectEmployee) => {
        alert('Project Employee Added Successfully');
        this.getAllProjectEmployee(this.projectEmployee.projectId);
      },
      (err) => {
        alert('Project Employee Addition Failed');
        this.getAllProjectEmployee(this.projectEmployee.projectId);
      }
    );
  }
}
