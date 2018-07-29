import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email: any;
  password: any;
  type: 'password';
  empModel: Employee;

  readonly ROOT_URL = 'http://shibutamang-001-site1.itempurl.com/token';
  readonly DATA_URL = 'http://shibutamang-001-site1.itempurl.com/api/Employees';

  constructor(private router: Router, private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('usrToken');
  }

  login(email, password) {
    const usrdata = 'username=' + email + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders(
      { 'Content-Type': 'application/x-www-form-urlencoded'}
    );
    return this.http.post(this.ROOT_URL, usrdata, {headers: reqHeader});
  }
  getData() {
    return this.http.get(this.DATA_URL);
  }

  postData(value: any) {
    const reqHeader = new HttpHeaders(
      { 'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.DATA_URL, value);
  }

  editData(id: any) {
       return this.http.get(`${this.DATA_URL}/${id}`);
  }

  updateData(id: number, value: Employee) {
        const reqHeader = new HttpHeaders(
      { 'Content-Type': 'application/x-www-form-urlencoded'});
      return this.http.put(`${this.DATA_URL}/${id}`, value);
  }

  deleteData(id: any) {
    return this.http.delete(`${this.DATA_URL}/${id}`);
  }
}
