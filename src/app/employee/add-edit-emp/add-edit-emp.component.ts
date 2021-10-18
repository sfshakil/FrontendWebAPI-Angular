import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp:any;
  EmployeeId:string="";
  EmployeeName:string="";
  Department:string="";
  DateOfJoining:string="";
  PhotoFileName:string="";
  PhotoFilePath:string="";

  DepartmentList:any=[];
  EmployeeList:any=[];

  constructor(private service : SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getGetAllDepartmentNames().subscribe(data =>{
      this.DepartmentList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName;
    });
    
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId,EmployeeName:this.EmployeeName,Department:this.Department,DateOfJoining:this.DateOfJoining,PhotoFileName:this.PhotoFileName};
    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  UpdateEmployee(){
    var val = {EmployeeId:this.EmployeeId,EmployeeName:this.EmployeeName,Department:this.Department,DateOfJoining:this.DateOfJoining,PhotoFileName:this.PhotoFileName};
    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadFile',file,file.name);

    this.service.uploadPhoto(formData).subscribe( (data:any)=>{
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl+this.PhotoFileName;
    }

    );
  }

}
