import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './user-auth.service';

@Injectable()
export class AuthGuestService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ) {
      if (!this.auth.isAuth()) { 
        // console.log('inter')
        this.router.navigate(['login']);
      }
      return true;
    }

}

