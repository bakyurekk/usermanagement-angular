import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyType } from 'src/app/models/enum/AlertifyType.enum';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertifyService:AlertifyService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if(this.authenticationService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login'])
    //TODO -  Send notification to user
    this.alertifyService.error(AlertifyType.ERROR,  'You need to log in to access this page'.toLowerCase());
    return false;
  }
}
