import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertifyType } from 'src/app/models/enum/AlertifyType.enum';
import { HeaderType } from 'src/app/models/enum/HeaderType.enum';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public isSubmit: boolean = false;
  public loading: boolean = false;
  public showPassword: boolean = false;
  private subscriptions:Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/user/management']);
    } else {
      this.router.navigate(['/auth/login']);
    }

    this.createForm();
  }


  createForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public login() {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.loading = true;
      let data = Object.assign({}, this.loginForm.value);

      console.log(data);

      this.authenticationService
        .login(data)
        .subscribe({
          next:(response: HttpResponse<User>) => {
            const token = response.headers.get(HeaderType.JWT_TOKEN);
            this.authenticationService.setToken(token);
            this.authenticationService.setUserToLocalCache(data);
            this.alertifyService.success(
              'You have logged in successfully ',
              AlertifyType.SUCCESS,
            );
            this.router.navigate(['/user/management']);
          },
          error:(errorResponse:HttpErrorResponse)=>{
            setTimeout(() => {
              console.log(errorResponse);
              this.sendNotificationError(errorResponse.error.message, AlertifyType.ERROR, )
              this.loading = false;
              this.isSubmit = false;
            }, 1000);
          },
          complete:()=>console.info('Completed')
        }

        );
    }
  }

  private sendNotificationError(message: string, alertifyType: AlertifyType, ) {
    if(message){
      this.alertifyService.error(message, alertifyType);
    }else{
      this.alertifyService.error('AN ERROR OCCURED. PLEASE TRY AGEIN',alertifyType);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
