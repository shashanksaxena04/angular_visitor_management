import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/user-auth.service';
import { AppValidators } from '../../services/AppValidators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    submitted = false;
	result:any;
    error:any;

  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService,private spinner: NgxSpinnerService) {
  //  this.toastr.success('hello');
    this.loginForm = fb.group({
      email: ['', [Validators.required,AppValidators.EmailValidator]],
      password: ['',[Validators.required]],

    });

   }

  ngOnInit(): void {

  }

  onSubmit(){  
	  this.submitted = true;
	  if (this.loginForm.valid) {
     this.spinner.show()
		  this.service.apiPost('adminLogin', this.loginForm.value)
		  .subscribe(result => {
			  this.result = result;
        if(this.result.status =='success'){
    
          if(this.result.profile.user_type == 0){
              this.spinner.hide()
              console.log(this.result)
              this.auth.setToken(this.result)
              localStorage.setItem('name', JSON.stringify(this.result.profile.name));
              this.auth.setUsertype(this.result.profile.user_type)
              localStorage.setItem('package_id', JSON.stringify(this.result.profile.package_id));
              localStorage.setItem('id', JSON.stringify(this.result.profile.id));
              this.toastr.success(this.result.message);
              this.router.navigate(['/dashboard']);
          }else{
                  this.auth.setToken(this.result)
                  localStorage.setItem('name', JSON.stringify(this.result.profile.name));
                  this.auth.setUsertype(this.result.profile.user_type)
                  localStorage.setItem('package_id', JSON.stringify(this.result.profile.package_id));
                  localStorage.setItem('id', JSON.stringify(this.result.profile.id));
                  this.packageCheck(this.result.profile.package_id,this.result.profile.id,)
          }
        
        }else{
          this.spinner.hide()
          this.toastr.error(this.result.message);
        }
    
		  }, error  => {
    	        this.error = error;
                this.toastr.error(this.error.error.message);
                this.spinner.hide();
    	  });
	 } else {
    this.toastr.error('Form invalid');
	 }
  }



  packageCheck(package_id,entity_id){
console.log(package_id)
console.log(entity_id)
    this.service.apiGet('checkPackageExpiration?package_id='+package_id+'&entity_id='+entity_id)
    .subscribe(result => {
      this.spinner.hide();
       this.result = result;
     if(this.result.data.package_expiration == 0){
        this.router.navigate(['package/current-package']);
     }else if(this.result.data.guard_length == 0){
      this.toastr.success('Please add atleast on guard and one employee')
      this.router.navigate(['entity/entity-notice']);
     }else if(this.result.data.employee_length == 0){
      this.toastr.success('Please add atleast on guard and one employee')
      this.router.navigate(['entity/entity-notice']);
     }else {
      this.router.navigate(['/visitor']);
     }
       
    }, error  => {
      this.error = error;
        this.toastr.error(this.error.error.message);
        this.spinner.hide();
    });
  }

}
