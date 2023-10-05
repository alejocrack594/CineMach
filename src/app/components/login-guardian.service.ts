import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BdloginService } from './bdlogin.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardianService implements CanActivate {

  constructor(private bdlogin: BdloginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.bdlogin.isAutenticado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}