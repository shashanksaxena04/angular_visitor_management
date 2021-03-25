import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
 
})
export class AddPackageComponent implements OnInit {

    packageForm: FormGroup;
    submitted = false;
	  result:any;
    error:any;
    id:any;
    obj:any;

  constructor(public toastr:ToastrService, private route: ActivatedRoute,private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.packageForm = fb.group({
      name: ['', [Validators.required]],
      amount: ['',[Validators.required]],
      duration: ['',[Validators.required]],

    });

   }

  ngOnInit(): void {
    if(this.id!==null){
   
      this.getPackageById(this.id)
     
  
     }
  }

  onSubmit(){  
   
	  this.submitted = true;
	  if (this.packageForm.valid) {
      
      if(this.id ==null){
        this.service.apiPost('addPackage', this.packageForm.value)
        .subscribe(result => {
          this.result = result;
          console.log(this.result)
         
           // this.auth.setInfo(this.result.profile.user_id);
            this.toastr.success(this.result.message);
            this.router.navigate(['/package']);
        }, error  => {
                this.error = error;
              //    this.toastr.errorToastr(this.error.error.message);
                //  this.spinner.hide();
          });
      }else{
       this.obj = this.packageForm.value;
       this.obj.id = this.id;

        this.service.apiPost('updatePackage',this.obj )
        .subscribe(result => {
          this.result = result;
          console.log(this.result)
         
           // this.auth.setInfo(this.result.profile.user_id);
             this.toastr.success(this.result.message);
            this.router.navigate(['/package']);
        }, error  => {
                this.error = error;
              //    this.toastr.errorToastr(this.error.error.message);
                //  this.spinner.hide();
          });
      }
		 
	 } else {
	     console.log(11)
	 }
  }

  getPackageById(id){

    this.service.apiGet('getPackageById/'+id)   
    .subscribe(
      result => {
        this.result = result
        if(this.result.status == "success"){

          this.packageForm.setValue({
                name:this.result.data.name,
                amount:this.result.data.amount,
                duration:this.result.data.duration

          })

        }

      }, error  => {
            this.error = error;
        
        });

      }

}
