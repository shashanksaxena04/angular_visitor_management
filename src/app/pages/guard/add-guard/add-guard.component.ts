import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-guard',
  templateUrl: './add-guard.component.html',
  styleUrls: ['./add-guard.component.css']
})
export class AddGuardComponent implements OnInit {

    guardForm: FormGroup;
    submitted = false;
	  result:any;
    error:any;
    id:any;
    obj:any;
    entity_id:any;
    add_obj:any;
    package_id:any

    constructor(public toastr:ToastrService, private route: ActivatedRoute,private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,) {
      this.entity_id = JSON.parse(localStorage.getItem("id"));
      this.package_id = JSON.parse(localStorage.getItem("package_id"));
      this.id = this.route.snapshot.paramMap.get('id');
  
      this.guardForm = fb.group({
        name: ['', [Validators.required]],
        mobile: ['',[Validators.required]],
        
  
      });
  
     }

     ngOnInit(): void {
      if(this.id!==null){
     
       this.getGuardById(this.id)
       
    
       }
    }

    onSubmit(){  
   
      this.submitted = true;
      if (this.guardForm.valid) {
        
      this.add_obj = this.guardForm.value;
      this.add_obj.entity_id =  this.entity_id;

        if(this.id ==null){
          this.service.apiPost('addGuard', this.add_obj)
          .subscribe(result => {
            this.result = result;
            if(this.result.status == 'success'){
              console.log(this.result)
   
              this.packageCheck(this.package_id, this.entity_id)
            }else{
                    this.toastr.error(this.result.message);

            }
           
          }, error  => {
                  this.error = error;
                //    this.toastr.errorToastr(this.error.error.message);
                  //  this.spinner.hide();
            });
        }else{
         this.obj = this.guardForm.value;
         this.obj.id = this.id;
  
          this.service.apiPost('updateGuard/'+this.obj.id,this.obj )
          .subscribe(result => {
            this.result = result;
            console.log(this.result)
           
             // this.auth.setInfo(this.result.profile.user_id);
              this.toastr.success(this.result.message);
              this.router.navigate(['/guard']);
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

    getGuardById(id){
      
      this.service.apiGet('getGuardById/'+id)   
      .subscribe(
        result => {
          this.result = result
          if(this.result.status == "success"){
  
            this.guardForm.setValue({
                  name:this.result.data.name,
                  mobile:this.result.data.mobile
                
  
            })
  
          }
  
        }, error  => {
              this.error = error;
          
          });
  
        }


        packageCheck(package_id, entity_id){

          this.service.apiGet('checkPackageExpiration?package_id='+package_id+'&entity_id='+entity_id,)
          .subscribe(result => {
          
             this.result = result;
           if(this.result.data.employee_length == 0){
            this.toastr.success('please add the Employee');
            this.router.navigate(['employee/add-employee']);
           }else {
            this.toastr.success('Guard Added Successfully');
            this.router.navigate(['/guard']);
           }
             
          }, error  => {
            this.error = error;
              this.toastr.error(this.error.error.message);
             
          });
        }
  

}
