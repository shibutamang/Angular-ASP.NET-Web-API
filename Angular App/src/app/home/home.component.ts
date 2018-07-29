import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../model/employee';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:59830/api/values';
  empList: Employee[];

  constructor(private router: Router, private http: HttpClient, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit() {

    this.getEmp();
 
  }

  getEmp(){
       this.service.getData().subscribe(
      (data: any) => {
        this.empList = data;
         console.log(data); },
      (error: any) => {console.log('error'); }
    );
  }

  add(){
    this.router.navigate(['add']);
  }

  delete(id: any) {
    var del = confirm('Are you sure to delete?')
    if(del) {
      this.service.deleteData(id).subscribe(
        () => {
        this.toastr.success('Deleted successfully');
        this.getEmp(); }
      );
      //this.router.navigate(['home']);
    }
  }

  logOut() {
    localStorage.removeItem('usrToken');
    this.router.navigate(['login']);
  }
}
