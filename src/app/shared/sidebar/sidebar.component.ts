import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/user-auth.service';
import { AppValidators } from '../../services/AppValidators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
name:any;
user_type:any;
entity_id:any;
package_id:any;
result:any;
error:any;
package_disability:Boolean
employee_disability:Boolean
guard_disability:Boolean
  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService,private spinner: NgxSpinnerService) {

    this.name = JSON.parse(localStorage.getItem("name"));
    this.user_type = JSON.parse(localStorage.getItem("usertype"));
    this.entity_id = JSON.parse(localStorage.getItem("id"));
    this.package_id = JSON.parse(localStorage.getItem("package_id"));
   }

  ngOnInit(): void {
    if(this.user_type !==0){
      this.packageCheck(this.package_id,this.entity_id)
    }
   
  }

  packageCheck(package_id, entity_id){

    this.service.apiGet('checkPackageExpiration?package_id='+package_id+'&entity_id='+entity_id,)
    .subscribe(result => {
      this.spinner.hide();
       this.result = result;

       if(this.result.data.package_expiration == 0){
        this.package_disability = true
       }
       if(this.result.data.employee_length == 0){
         this.employee_disability = true
       }
       if(this.result.data.guard_length == 0){
        this.guard_disability = true
       }
     
       
    }, error  => {
      this.error = error;
        this.toastr.error(this.error.error.message);
        this.spinner.hide();
    });
  }

}
