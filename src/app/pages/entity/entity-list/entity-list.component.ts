import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  page: number = 1;
  count: Number = 10;
  searc : String;
   result:any;
   totalcount:any;
   entityData:any;
   error:any;
   empty:boolean=false;
  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService,) { }

  ngOnInit(): void {

    this.getEntityData(this.page);

  }


  getEntityData(page){
    this.page = page
    var p = page;
    if(this.searc == undefined){
      this.searc = ""
    }
   
    this.service.apiGet('entityList?page='+p+'&per_page='+this.count+'&search_value='+this.searc)
    
    .subscribe(
      result => {
       this.result = result
        console.log(this.result.message)
      
        if(this.result.status == "success"){
          console.log(this.result.data)
          this.totalcount = this.result.count
          this.entityData = this.result.data
    
        }else{
          if(this.result.data.length ==0){
                 this.empty = true
          }

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
      this.getEntityData(1)
     
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
            this.service.apiPost('deleteEntity', data)
            
            .subscribe(
              result => {
               this.result = result
                console.log(this.result.message)
              
                if(this.result.status == "success"){
        
                  this.getEntityData(1)
               
                 
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
