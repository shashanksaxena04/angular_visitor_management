import { AbstractControl, FormArray, FormControl,FormGroup, ValidatorFn, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from 'rxjs';
import { map ,catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
    import { HttpClient, HttpErrorResponse } from '@angular/common/http';
    // import { catchError } from 'rxjs/operators'
    import { throwError } from 'rxjs';
// import 'rxjs/add/operator/map'; 


// import { RoleService } from '../roles/services/role.service';
// import { AdminUserService } from '../admin-users/services/AdminUser.service';
// import { EventService } from '../events/services/event.service';
// import { VenueService } from '../venues/services/venue.service';
// import { CategoryService } from '../categories/services/category.service';
// import { UserService } from '../shared/user.service';

export class AppValidators {
  // public userUniqueUsername;

  // constructor(public userService : UserService){}

  // static minSelectedCheckboxes(min = 1) {
  //   const validator: ValidatorFn = (formArray: FormArray) => {
  //     const totalSelected = formArray.controls
  //       // get a list of checkbox values (boolean)
  //       .map(control => control.value)
  //       // total up the number of checked checkboxes
  //       .reduce((prev, next) => next ? prev + next : prev, 0);
  //     // if the total is not greater than the minimum, return the error message
  //     return totalSelected >= min ? null : { required: true };
  //   };
  //   return validator;
  // }

  // static minItems(control: FormControl): { [s: string]: boolean } {
  //   if (control.value !== null && control.value.length === 0) {
  //     return { required: true };
  //   }
  //   return null;
  // }

  // static MatchPassword(AC: AbstractControl) {
  //   if (AC.get('confirmPassword').errors && !AC.get('confirmPassword').errors['MatchPassword']) {
  //     return;
  //   }
  //   if (AC.get('password').value !== AC.get('confirmPassword').value) {
  //     AC.get('confirmPassword').setErrors({ MatchPassword: true });
  //     return { MatchPassword: true };
  //   }
  //   AC.get('confirmPassword').setErrors(null);
  //   return null;
  // }

  static EmailValidator(control: FormControl): { [s: string]: boolean } {
    
    if (control.value === null || control.value.length === 0) {
      return null;
    } else {
      const EMAIL_REGEXP = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
      return EMAIL_REGEXP.test(control.value) ? null : { validateEmail: true };
    }
  }

  // static checked(control:FormControl) {
  //      return { "checked": control.value } ;
  // }


  // static validateHost(control: FormControl): { [s: string]: boolean } {
  //   if (control.value === null || control.value.length === 0) {
  //     return null;
  //   } else {
  //     const HOST_REGEXP = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g;
  //     return HOST_REGEXP.test(control.value) ? null : { validateHost: true };
  //   }
  // }

  //This will allow long values
  // static longPattern(control: AbstractControl): ValidationErrors | null {
  //   const re = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  //   if (!control.value)
  //     return null;
  //   const valid = re.test(control.value);
  //   return valid ? null : { longPattern: true };
  // }

  //This will allow lat values
  // static latPatterng(control: AbstractControl): ValidationErrors | null {
  //   const re = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  //   if (!control.value)
  //     return null;
  //   const valid = re.test(control.value);
  //   return valid ? null : { latPattern: true };
  // }

  // static urlPattern(control: AbstractControl): ValidationErrors | null {
  //   const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  //   if (!control.value)
  //     return null;
  //   const valid = re.test(control.value);
  //   return valid ? null : { urlPattern: true };
  // }

  //This will allow decimal numbers (or whole numbers) that don't start with zero
  // static acceptNumbers(control: AbstractControl): ValidationErrors | null {
  //   const re =  /^\d{10}$/;  ///^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/;
  //   if (!control.value) 
  //     return null;
  //   const valid = re.test(control.value);
  //   return valid ? null : { acceptNumbers: true };
    
  // }

//  static acceptAdharNumber(control: AbstractControl): ValidationErrors | null {
//     const re = /^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/;
//     if (!control.value) 
//       return null;
//     const valid = re.test(control.value);
//     return valid ? null : { acceptAdharNumber: true };
    
//   }
  
  // static pattern(control: AbstractControl): ValidationErrors | null {
  //   const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  //   if (!control.value)
  //     return null;
  //   const valid = re.test(control.value);
  //   return valid ? null : { pattern: true };
  // }

  // static userNameSpecialChars(control: AbstractControl): ValidationErrors | null {
  //   const re = /([\\\/:*?^<>|'"Æ]|{end})/;
  //   if (!control.value)
  //     return null;
  //   const valid = re.test(control.value);
  //   return valid ? { userNameSpecialChars: true } : null;
  // }

  // static email(control: AbstractControl): ValidationErrors | null {
  //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!control.value)
  //     return null;
  //   const valid = re.test(control.value.trim());
  //   return valid ? null : { email: true };
  // }


  // static shouldNotStartWith(value: any): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {

  //     const opt: any[] = value.split(',');
  //     for (let i = 0; i < opt.length; i++) {
  //       let val = control.value;
  //       if (val != undefined && val.trim().toLowerCase().startsWith(opt[i])) {
  //         return { 'shouldNotStartWith': true };
  //       }
  //     }
  //     return null;
  //   }
  // }

  // static shouldNotStartWithSpace(value: any): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     if (control.value === null || control.value.length === 0) {
  //       return null;
  // }
  //     let val = control.value;
  //     if (val != undefined && val.startsWith(' ')) {
  //       return { 'shouldNotStartWithSpace': true };
  //     }

  //     return null;
  //   }
  // }

  // static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     if (!control.value) {
  //       // if control is empty return no error
  //       return null;
  //     }

  //     // test the value of the control against the regexp supplied
  //     const valid = regex.test(control.value);

  //     // if true, return no error (no error), else return error passed in the second parameter
  //     return valid ? null : error;
  //   };
  // }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('password_confirmation').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password_confirmation').setErrors({ NoPassswordMatch: true });
    }
  }

  // static minlen(minNum: number, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     if (!control.value) {
  //       // if control is empty return no error
  //       return null;
  //     }
  //     return ((control.value.trim()).length >= minNum) ? null : error;
  //   };
  // }

  // static maxlen(maxNum: number, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     if (!control.value) {
  //       // if control is empty return no error
  //       return null;
  //     }
  //     return ((control.value.trim()).length <= maxNum) ? null : error;
  //   };
  // }

  // static categoryUniqueNameEn(categoryService: CategoryService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return categoryService.checkNameEnExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static categoryUniqueNameAr(categoryService: CategoryService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return categoryService.checkNameArExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static venueUniqueNameEn(venueService: VenueService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return venueService.checkNameEnExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static venueUniqueNameAr(venueService: VenueService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return venueService.checkNameArExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static eventUniqueTitleEn(eventService: EventService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return eventService.checkTitleEnExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         console.log(res);

  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static eventUniqueTitleAr(eventService: EventService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return eventService.checkTitleArExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }


  // static roleUniqueNameEn(roleService: RoleService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return roleService.checkNameEnExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static roleUniqueNameAr(roleService: RoleService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return roleService.checkNameArExist({ name: c.value, _id: _id }).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static userUniqueEmail(adminUserService: AdminUserService): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     return adminUserService.checkEmailExist(c.value).pipe(
  //       map((res: any) => {
  //         return res.exist ? { notUnique: true } : null
  //       })
  //     )
  //   }
  // }

  // static userUniqueUsername(userService: UserService): {
  //   return (control: AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //     // return userService.user_validation({username:control.value.toLowerCase()}).map(res => {
  //     //   return res.success ? {emailTaken: true} : false ;
  //     // },
  //     // error =>  {
  //     //   console.log(error);
  //     //   return error.success ? {emailTaken: false} : false ;
  //     // });
  //   }
  // }


    // handleError(error: HttpErrorResponse){
    // console.log("lalalalalalalala");
    // return throwError(error);
    // } 

  // static userUniqueUsername(userService: UserService): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {     
  //    //.toLowerCase()
  //    return userService.user_validation({username:c.value.trim().toLowerCase()}).pipe(
  //       map((res: any) => {
  //         return res.success ? { notUnique: true } : null
  //       }) 
  //     ) 
  //   }
  // }

  // static checkUserType(): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {     
  //    //.toLowerCase()
  //    return userService.user_validation({username:c.value}).pipe(
  //       map((res: any) => {
  //         return res.success ? { notUnique: true } : null
  //       }) 
  //     )
  //   }
  // }

 

  // static CheckTenantUniqueNumber(userService: UserService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {     
     
  //    return userService.tenant_validation({phone:c.value,_id:_id}).pipe(
  //       map((res: any) => {
  //         return res.success ? null : { notUnique: true }
  //       }) 
  //     )
  //   }
  // }

  // static CheckTenantUniqueEmail(userService: UserService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {     
  //    return userService.tenant_validation({email:c.value,_id:_id}).pipe(
  //       map((res: any) => {
  //         return res.success ? null : { notUnique: true }
  //       }) 
  //     )
  //   }

  // }

  // static CheckLandlordUniqueNumber(userService: UserService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {     
     
  //    return userService.landlord_validation({phone:c.value,_id:_id}).pipe(
  //       map((res: any) => {
  //         return res.success ? null : { notUnique: true }
  //       }) 
  //     )
  //   }
  // }

  // static CheckLandlordUniqueEmail(userService: UserService, _id?: string): AsyncValidatorFn {
  //   return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {     
  //    return userService.landlord_validation({email:c.value,_id:_id}).pipe(
  //       map((res: any) => {
  //         return res.success ? null : { notUnique: true }
  //       }) 
  //     )
  //   }

  // }

  // static getGeodata(userService: UserService,action) {
  //  return userService.getGoeData(action);
  // }
  

//   static checkMobileNumber(fg: AbstractControl) {
// // console.log(fg.get('local_contact').value);
//    return fg.get('phone').value == fg.get('local_contact').value ? { notNumber : true } : null; 
   
//   }
  // get uploadImage(image) {

   
     // == fg.get('native_contact').value == fg.get('reference_contact').value
     // == fg.get('reference_contact_2').value
  //   // const bucket = new S3(
  //     {
  //       accessKeyId: 'AKIAZZ43RRQ62TWQZTWR',
  //       secretAccessKey: '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',
  //       region: 'ap-southeast-1'
  //     }
  //   );

  //  const params = {
  //     Bucket: 'rirepo-dev',
  //     Key:   image.name,
  //     Body: image
  //   }; 

  //  bucket.upload(params, function (err, data) {
  //     if (err) {
  //       console.log('There was an error uploading your file: ', err);
  //       return false;
  //     }  else {
  //    //    callback(data)
  //      console.log('Successfully uploaded file.', data.key); 
  //     }
  //   }).send(function (err, response) {
  //    // console.log(response);
  //      return response.Location;

  //   });
  //    return 1;
  // }

  
}
