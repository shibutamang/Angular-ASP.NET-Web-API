import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Employee } from '../model/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	empData: Employee;
  ID: number;

  constructor(private route: ActivatedRoute, private router: Router, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
    const id = Number.parseInt(params['id']);
    this.ID = id;
  	console.log(id);

  		this.service.editData(id).subscribe(
  		(data: any) => {
        this.empData = data;
         console.log(data); },
      (error: any) => {console.log('error'); });

	});
  }

  update() {
    //console.log(this.empData);
    this.service.updateData(this.ID, this.empData).subscribe(
      (data: any) => { 
        this.toastr.success('updated successfully');
        this.router.navigate(['home']); },
      (error: any) => { this.toastr.error('could not update data'); }
    );
  }

  

}
