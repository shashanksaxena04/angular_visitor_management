import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/user-auth.service';
import { AppValidators } from '../../services/AppValidators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
name:any;
  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService,) {
    this.name = JSON.parse(localStorage.getItem("name"));
   }

  ngOnInit(): void {
  }

  logout() {
    console.log('hello')
		this.auth.removeInfo();
    localStorage.removeItem('package_id');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.auth.logOut();
    localStorage.clear();
		 this.router.navigate(['/login']);
	}

}
