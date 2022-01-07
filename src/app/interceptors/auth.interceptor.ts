import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  apiUrl:string = this.authenticationService.host;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
   
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.apiUrl}/user/login `)) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(`${this.apiUrl}/user/register`)) {
      return httpHandler.handle(httpRequest);
    }
     
    if (httpRequest.url.includes(`${this.apiUrl}/user/resetPassword`)) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadToken();
    
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({setHeaders: { Authorization: `Bearer ${token}`}});

    return httpHandler.handle(request);

  }
}
