import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   result:any;
   error:any;
   count:any;
  constructor(public toastr:ToastrService, private route: ActivatedRoute,private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,) { }

  ngOnInit(): void {
    this.getDashboardCOunt()
  }


  getDashboardCOunt(){

    this.service.apiGet('getDashboardCount')
    .subscribe(
      result => {
       this.result = result
     console.log(this,result)
        if(this.result.status == "success"){
        
          this.count = this.result.data
        }else{

        }
      }, error  => {
       
        console.log(error.error.message)
        this.error = error;
        console.log(error);
    })
}

}
