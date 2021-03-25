import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-guard-list',
  templateUrl: './guard-list.component.html',
  styleUrls: ['./guard-list.component.css']
})
export class GuardListComponent implements OnInit {
    page: number = 1;
    count: Number = 10;
    searc : String;
    result:any;
    totalcount:any;
    guardData:any;
    error:any;
    entity_id:any;

  constructor(private fb: FormBuilder,public service: CommonService,public router: Router,public auth: AuthService,private toastr: ToastrService,) {
    this.entity_id = JSON.parse(localStorage.getItem("id"));
   }

  ngOnInit(): void {
  
    this.getGuardData(this.page);
  }

  getGuardData(page){
    this.page = page
    var p = page;
    if(this.searc == undefined){
      this.searc = ""
    }
    this.service.apiGet('getGuardList?page='+p+'&per_page='+this.count+'&search_value='+this.searc+'&entity_id='+this.entity_id)
    .subscribe(
      result => {
       this.result = result
        console.log(this.result.message)
      
        if(this.result.status == "success"){
          console.log(this.result.data)
       this.totalcount = this.result.count
      this.guardData = this.result.data
    
        }else{

        }
      }, error  => {
       
        console.log(error.error.message)
        this.error = error;
        console.log(error);
    })
}


      Search(){
              
        if(this.searc == ""){  
            this.ngOnInit();
        }else{
          this.searc = this.searc
          this.getGuardData(1)
        
        }

      }


      delete(data){
        console.log(data)
        
            Swal.fire({
              title: 'Are you sure want to remove?',
              text: 'You will not be able to recover this data!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, keep it'
            }).then((result) => {
              if (result.value) {
                console.log(data.id)
        
                //this.service.apiGet('/auth/getpipeline_leads',{})
                this.service.apiPost('deleteGuard', data)
                
                .subscribe(
                  result => {
                  this.result = result
                    console.log(this.result.message)
                  
                    if(this.result.status == "success"){
            
                      this.getGuardData(1)
                  
                    
                      Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                      )
                
                    }
                  }, error  => {
                  
                    console.log(error.error.message)
                    this.error = error;
                    this.toastr.error(error.error.message);
                    console.log(error);
                })
              
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelled',
                  'Your data is safe :)',
                  'error'
                )
              }
            })
          
          }
   


}
