import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }


  confirmEmail(confirmEmail: { code: string }) {
    return this.http.post('auth/confirmEmail', confirmEmail);
  }

  isAuth() {
    return localStorage.getItem('bearer') !== null ;
  }

  logOut() {
    this.removeInfo();
    this.removeToken();
    this.removeUsertype();
    sessionStorage.clear();
  }

  setToken(token: string): void {
    localStorage.setItem('bearer', token);
  }

  setUsertype(usertype: string): void {
    localStorage.setItem('usertype', usertype);
  }
  
  setInfo(profile_image, username,user_id,email): void {
    localStorage.setItem('profile_image', profile_image);
    localStorage.setItem('username', username);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('email', email);
  }

  getIsLoggedIn(): string {
    return localStorage.getItem('isLoggedin');
  }

  removeInfo(): void {
    localStorage.removeItem('profile_image');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('isLoggedin');
  }

  removeUsertype(): void {
    localStorage.removeItem('usertype');
  }

  removeToken(): void {
    localStorage.removeItem('bearer');
  }
  getToken(): string {
    return localStorage.getItem('bearer');
  }

  getUserType(): string {
    return localStorage.getItem('usertype');
  }

  hasPermission(permissionCheck: string) {
    if( localStorage.getItem('permissions') !== null){
      const ifExist = JSON.parse(localStorage.getItem('permissions')).find( permission => {
        return permission.name_en === permissionCheck;
      });
      if(ifExist != null && ifExist != undefined){
        return true
      }
    }
    return false;
  }

}
