import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList:any=[];

  ModalTitle:string="";
  ActivateAddEditComp:boolean=false;
  emp:any;

  constructor(private service : SharedService) { }
  
  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditComp = true;
  }

  closeClick(){
    this.ActivateAddEditComp = false;
    this.refreshEmployeeList();
  }

  editClick(item:any){
    this.emp={
      EmployeeId:item.EmployeeID,
      EmployeeName:item.EmployeeName,
      Department:item.Department,
      DateOfJoining:item.DateOfJoining,
      PhotoFileName:item.PhotoFileName
    }
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditComp = true;
  }

  deleteClick(item:any){
    if(confirm("Are you sure?")){
      this.service.deleteEmployee(item.EmployeeID).subscribe( res => {
        alert(res.toString());
        this.refreshEmployeeList();
      });
      
    }
  }

  refreshEmployeeList(){
    this.service.getEmpList().subscribe( data =>{
      this.EmployeeList = data;
    });
  }

}
