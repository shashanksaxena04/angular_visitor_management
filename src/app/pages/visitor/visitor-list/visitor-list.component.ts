import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  page: number = 1;
  count: Number = 10;
  searc : String;
  result:any;
  visitorData:any;
  totalcount:any;
  error:any;
  entity_id:any;


  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService,) { 
    this.entity_id = JSON.parse(localStorage.getItem('id'));
  }

  ngOnInit(): void {

    this.getVisitorData(this.page);
  }


  getVisitorData(page){
    this.page = page
    var p = page;
    if(this.searc == undefined){
      this.searc = ""
    }
  
   
    this.service.apiGet('getVisitorList?page='+p+'&per_page='+this.count+'&search_value='+this.searc+'&entity_id='+this.entity_id)
    
    .subscribe(
      result => {
       this.result = result
        console.log(this.result.message)
      
        if(this.result.status == "success"){
          console.log(this.result.data)
       this.totalcount = this.result.count
       //this.result.data
       this.visitorData = this.result.data.map(el=>{

       if(el.in_time === '00:00:00'){
          el.in_time ='00:00:00'
        }else  if(el.in_time !==null){
          el.in_time = this.tConvert(el.in_time);
        }
        else{
          el.in_time ='00:00:00'
        }
   
      if(el.out_time === '00:00:00'){
     
        el.out_time = '00:00:00'
      }else if(el.out_time !==null){
    
        el.out_time = this.tConvert(el.out_time);
      }else{
      
        el.out_time = '00:00:00'
      }
       
       return el
       })
     //  console.log(this.result.data)
      
         
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
      this.getVisitorData(1)
    
    }

  }

  tConvert(time) {
        
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

}
