import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl,Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../services/user-auth.service';
import { AppValidators } from '../../../services/AppValidators';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'
declare var Razorpay: any; 

@Component({
  selector: 'app-current-package',
  templateUrl: './current-package.component.html',
  styleUrls: ['./current-package.component.css']
})
export class CurrentPackageComponent implements OnInit {
 
   result:any;
   packageData:any;
   error:any;
   id:any;
   package_id:any;
   currentPackage:any;
   expired:boolean;
   outletDetail:any;
   static route:Router;
   static API_SERVICE:CommonService ;

   razorPayOptions = {
    "key": 'rzp_test_Lkc0p0jmuczsiN', // Enter the Key ID generated from the Dashboard
    "amount": 500, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
    "currency": "INR",
    "name": "Favouright",
    "description": "Your selected Packge Payment",
    "order_id":"ORDERID_FROM_BACKEND",
    "image": "https://example.com/your_logo",
    "handler": function (response) {
      console.log("this is the response ",response);
    },
    "notes": {
        "address": "Thank you for saving people in need"
    },
    "theme": {
        "color": "#8bf7a8"
    },
    // http_post:this.apiService
};




  constructor(private fb: FormBuilder,public service: CommonService, public router: Router,public auth: AuthService,private toastr: ToastrService) {
    CurrentPackageComponent.API_SERVICE = this.service ;
    CurrentPackageComponent.route = this.router;
    this.id = JSON.parse(localStorage.getItem('id'));
    this.package_id = JSON.parse(localStorage.getItem('package_id'));
   }

  ngOnInit(): void {
    this.getCurrentPackageData();
  }

  getCurrentPackageData(){
  
    this.service.apiGet('currentPackage?entity_id='+this.id+'&package_id='+this.package_id)
    .subscribe(
      result => {
       this.result = result
       
      
        if(this.result.status == "success"){
      
          this.currentPackage = this.result.data.current_package
          this.packageData = this.result.data.package_list
         
          this.packageCheck(this.package_id,this.id)
    
        }else{

        }
      }, error  => {
       
        console.log(error.error.message)
        this.error = error;
        console.log(error);
    })
  }

  packageCheck(package_id, entity_id){

    this.service.apiGet('checkPackageExpiration?package_id='+package_id+'&entity_id='+entity_id,)
    .subscribe(result => {
       this.result = result;
       console.log(this.result)
           if(this.result.data.package_expiration == 0){
            this.expired = true
           }else{
            this.expired = false
           }
        //  if(this.result.status == 'success'){
        //  this.expired = false
        //  }else{
        //  this.expired = true
        //  }
    }, error  => {
      this.error = error;
        this.toastr.error(this.error.error.message);
  
    });
  }

  buy_package(data){

    data.entity_id = this.id
    console.log(data)
    // data.amount = data.amount *100
    this.service.apiPost('purchase',data)
    .subscribe(result => {
      console.log('final')
       this.result = result;
       console.log(this.result)
       this.outletDetail = this.result;
       this.razorPayOptions.key = this.outletDetail.key;
       this.razorPayOptions.order_id = this.outletDetail.response.order.id ;
       this.razorPayOptions.amount =    this.outletDetail.response.amount; //this.outletDetail.amount;
     
       this.razorPayOptions.handler =  this.razorPayResponseHandler;
       
      //  localStorage.setItem('package_id', JSON.stringify(this.outletDetail.response.package_id));
      //  this.payment_creation_id = new Date().getTime();
      var final_data = {
             entity_id:this.result.response.entity_id,
             amount_payed : this.outletDetail.response.amount,
             order_id: this.outletDetail.response.order.id ,
             package_id:this.outletDetail.response.package_id
      }
      //  finalObject["id"] = this.outletDetail.id;
      //  finalObject["package_name"] = this.outletDetail.package_name;
      //  finalObject['amount'] = this.outletDetail.amount;
      //  finalObject['plan_expire'] = this.outletDetail.plan_expire;
      //  finalObject['package_id'] = this.outletDetail.package_id;
      
       sessionStorage.setItem("temp",JSON.stringify(final_data))
      var rzp1 = new Razorpay(this.razorPayOptions);
     
      rzp1.open();
       
    }, error  => {
      this.error = error;
        this.toastr.error(this.error.error.message);
  
    });


  }

  razorPayResponseHandler(response){
    let session_data = JSON.parse(sessionStorage.getItem('temp'));
          console.log(session_data)
        CurrentPackageComponent.API_SERVICE.apiPost('payment',session_data)
      .subscribe(result => {
        localStorage.setItem('package_id', JSON.stringify(session_data.package_id));
        window.location.reload();
       // CurrentPackageComponent.route.navigate(['/package/current-package']);
      
        // this.toastr.success('Package purchased Successfully');
        // this.getCurrentPackageData();
      

      }, error  => {
      this.error = error;
        this.toastr.error(this.error.error.message);

      })
  }

}
