import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/user-auth.service';
import { AppValidators } from '../../services/AppValidators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm: FormGroup;
    OTPForm: FormGroup;
    passwordForm:FormGroup;
    forgotPasswordsubmitted = false;
    otpsubmitted = false;
    passwordsubmitted = false;
    emailView= true;
    OTPView = false;
    passwordView = false;
  	result:any;
    error:any;
    email:any;
    otpObj:any;
    passwordObj:any;
  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService,private spinner: NgxSpinnerService) { 

    this.forgotPasswordForm = fb.group({

      email: ['', [Validators.required,AppValidators.EmailValidator]],
    });

    this.OTPForm = fb.group({

      otp: ['', [Validators.required]],
    });

    this.passwordForm = fb.group({

      password: ['', [Validators.required]],
      password_confirmation: ['',[Validators.required]],
    });

    
  }

  ngOnInit(): void {
  }

  forgotPasswordFormSubmit(){  
	  this.forgotPasswordsubmitted = true;
	  if (this.forgotPasswordForm.valid) {
      this.spinner.show()
		  this.service.apiPost('forgotPassword', this.forgotPasswordForm.value)
		  .subscribe(result => {
			  this.result = result;
         this.email =this.forgotPasswordForm.get('email').value
        if(this.result.status == 'success'){
          this.spinner.hide()
          this.emailView = false;
          this.OTPView = true;
         
          this.toastr.success(this.result.message);

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
    this.toastr.error('Form is invalid');
	 }
  }



  otpFormSubmit(){  
	  this.otpsubmitted = true;
	  if (this.OTPForm.valid) {
      this.spinner.show()
      this.otpObj={
       email:this.email,
       otp:this.OTPForm.get('otp').value
      }
		  this.service.apiPost('verifyOTP',  this.otpObj)
		  .subscribe(result => {
			  this.result = result;

        if(this.result.status == 'success'){
          this.spinner.hide()
          this.emailView = false;
          this.OTPView = false;
          this.passwordView = true;
          this.toastr.success(this.result.message);

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
    this.toastr.error('Form is invalid');
	 }
  }


  passwordFormSubmit(){  
	  this.passwordsubmitted = true;
    console.log(this.passwordForm.value)
	  if (this.passwordForm.valid) {
         this.spinner.show()
        if(this.passwordForm.get('password').value == this.passwordForm.get('password_confirmation').value){
                
            this.passwordObj={
              email:this.email,
              password:this.passwordForm.get('password').value
            }
            this.service.apiPost('resetPassword',  this.passwordObj)
            .subscribe(result => {
              this.result = result;

              if(this.result.status == 'success'){
                this.spinner.hide()
                // this.emailView = false;
                // this.OTPView = false;
                // this.passwordView = true;
                this.toastr.success(this.result.message);
                this.router.navigate(['/login']);

              }else{
                this.spinner.hide()
                this.toastr.error(this.result.message);
              }

            }, error  => {
                    this.error = error;
                      this.toastr.error(this.error.error.message);
                      this.spinner.hide();
              });
        }else{
          this.spinner.hide()
          this.toastr.error('Confirm password not match');
        }

	 } else {
    this.toastr.error('Form is invalid');
	 }
  }
  

  

}
