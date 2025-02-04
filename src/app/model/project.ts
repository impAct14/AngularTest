export interface IProject {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: Date;
  leadByEmpId: number;
  contactPerson: string;
  contactNo: number;
  emailId: string;
  employeeName: string;
}

export class ProjectEmployee {
  projectName: string;
  employeeName: string;
  empProjectId: number;
  projectId: number;
  empId: number;
  assignedDate: Date;
  role: string;
  isActive: boolean;

  constructor() {
    this.projectName = '';
    this.employeeName = '';
    this.empProjectId = 0;
    this.projectId = 0;
    this.empId = 0;
    this.assignedDate = new Date();
    this.role = '';
    this.isActive = true;
  }
}
