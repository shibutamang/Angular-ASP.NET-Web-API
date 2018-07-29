import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  empForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) {
      this.empForm = fb.group({
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required),
        Address: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Phone: new FormControl('', Validators.required)
      });
  }
  ngOnInit() {
  }

  postData(empForm: Employee) {
    console.log(empForm);
    this.empForm.reset();
    this.service.postData(empForm).subscribe(
      (data: any) => {
        this.toastr.success('successfully added');
       console.log('success');
       this.router.navigate(['home']); },
      (err: any) => { 
        this.toastr.error('an error occured');
        console.log('error!'); }
    );
  }

  updateData(id: number) {

  }

}
