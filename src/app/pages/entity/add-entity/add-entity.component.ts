import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators, FormControlName } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { DatePipe } from '@angular/common'



@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent implements OnInit {
    entityForm: FormGroup;
    submitted = false;
	  result:any;
    error:any;
    id:any;
    obj:any;
    package:any;
    guard:any;
    employee:any;
    guardvalue:any;
    employeevalue:any;
    el:any;
    // options = {
    //   multiple: true,
    //   tags: true
    // };
  
  constructor(public datepipe: DatePipe,private cdref: ChangeDetectorRef,public toastr:ToastrService, private route: ActivatedRoute,private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService) {

    this.id = this.route.snapshot.paramMap.get('id');

    this.entityForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,AppValidators.EmailValidator]],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      package_id: ['', [Validators.required]],
      notification: ['', [Validators.required]],
      agreement: ['', [Validators.required]],
      trial_date:['', [Validators.required]],
      // guard: ['', [Validators.required]],
      // employee: ['', [Validators.required]],

    });
   }
   set value(value: string[]) {
    console.log(value)
  
  }

  ngOnInit(): void {
      this.get();
      this.cdref.detectChanges();
      if(this.id!==null){
        this.getEntityId(this.id)
       }

  }


  get(){
    this.service.apiGet('getAll')
    .subscribe(
      result => {
       this.result = result
        
        if(this.result.status == "success"){
       
          this.package = this.result.data.package;
          this.guard = this.result.data.guard;
          this.employee = this.result.data.employee;

        }else{
            this.toastr.error(this.result.message)
        }
      }, error  => {
       
        console.log(error.error.message)
        this.error = error;
        console.log(error);
    })
  }



  file:any;
  uploadImages(element){ 
    this.el = element.target.files;
      this.file = element.target.files[0];
      console.log(this.file)
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);
      this.service.apiUpload('upload',formData) .subscribe(result => {
        console.log(result)
          this.result = result;
          this.entityForm.get('agreement').setValue(this.result.filename);
      }, error  => {
          this.error = error;
      });
  }


  onSubmit(){  
    this.submitted = true;
 var name =   this.entityForm.get('name').value;
	  if (name) {
    this.obj =  this.entityForm.value
    // this.obj.employee = JSON.stringify(this.entityForm.get('employee').value)
    // this.obj.guard = JSON.stringify(this.entityForm.get('guard').value)
    
    console.log(this.obj)
  
  
      if(this.id ==null){
        if(this.el.length !==0){
        this.service.apiPost('addEntity', this.obj)
        .subscribe(result => {
          this.result = result;       
            this.toastr.success(this.result.message);
            this.router.navigate(['/entity']);
        }, error  => {
                this.error = error;
                console.log(this.error)
                  this.toastr.error(this.error.error.message);
                //  this.spinner.hide();
          });
        }else{
          this.toastr.error('empty field');
        }
      }else{
      //  this.obj = this.entityForm.value;
       this.obj.id = this.id;
       console.log(this.obj)
        this.service.apiPost('updateEntity/'+this.obj.id,this.obj )
        .subscribe(result => {
          this.result = result;
          console.log(this.result)
         
             this.toastr.success(this.result.message);
            this.router.navigate(['/entity']);
        }, error  => {
                this.error = error;
                console.log(this.error)
                  this.toastr.error(this.error.error.message);
        
          });
    
    }
     
		 
	 } else {
	      console.log(11)
	  }

  }


  getEntityId(id){

    this.service.apiGet('getEntityById/'+id)   
    .subscribe(
      result => {
        this.result = result
  
        if(this.result.status == "success"){
          console.log(this.result)
          this.entityForm.setValue({
                name:this.result.data.name,
                email:this.result.data.email,
                mobile:this.result.data.mobile,
                address:this.result.data.address,
                password:this.result.data.password,
                package_id:this.result.data.package_id,
                notification:this.result.data.notification,
                agreement:this.result.data.aggrement,
                trial_date:this.datepipe.transform(this.result.data.end_date, 'yyyy-MM-dd')
                // guard:JSON.parse(this.result.data.guard_id),
                // employee:JSON.parse(this.result.data.employee_id)

          })

        }

      }, error  => {
            this.error = error;
        
        });

      }

}
