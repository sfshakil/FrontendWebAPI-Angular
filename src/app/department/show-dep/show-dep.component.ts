import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service : SharedService) { }

  DepartmentList:any = [];
  
  ModalTitle:string="";
  ActivateAddEditComp:boolean=false;
  dep:any;

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditComp = true;
  }
  closeClick(){
    this.ActivateAddEditComp = false;
    this.refreshDepartmentList();
  }
  editClick(item:any){
    this.dep={
      DepartmentId:item.DepartmentID,
      DepartmentName:item.DepartmentName
    }
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditComp = true;
  }
  deleteClick(item:any){
    if(confirm("Are you sure?")){
      this.service.deleteDepartment(item.DepartmentID).subscribe( res => {
        alert(res.toString());
        this.refreshDepartmentList();
      });
      
    }
  }
  refreshDepartmentList(){
    this.service.getDepList().subscribe( data =>{
      this.DepartmentList = data;
    });
  }
}
