import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  readonly APIUrl = "http://localhost:5000/api";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http : HttpClient) {}

  getDepList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/department');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/department',val)
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl+'/department',val)
  }

  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl+'/department/'+val)
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee');
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/Employee',val)
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/Employee',val)
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/Employee/'+val)
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile',val)
  }

  getGetAllDepartmentNames():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }
}
