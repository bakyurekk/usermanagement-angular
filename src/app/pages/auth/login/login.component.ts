import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public isSubmit: boolean = false;
  public loading: boolean = false;
  public showPassword: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private cdr:ChangeDetectorRef,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder
  ) {

    this.createLoginForm();
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/users/management']);
    } else {
      this.router.navigate(['/auth/login']);
    }

  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', [Validators.required]),
    });
    this.cdr.markForCheck();
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
      let userData = Object.assign({}, this.loginForm.value);

      console.log(userData);

      this.authenticationService.login(userData).subscribe({
        next: (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.setToken(token);
          this.authenticationService.setUserToLocalCache(response.body);
          this.cdr.markForCheck();
        },
        error: (errorResponse: HttpErrorResponse) => {
          setTimeout(() => {
            console.log(errorResponse);
            this.alertifyService.error(
              errorResponse.error.message,
              AlertifyType.ERROR
            );
            this.loading = false;
            this.isSubmit = false;
          }, 1000);
        },
        complete: () => {
          this.alertifyService.success(
            'You have logged in successfully ',
            AlertifyType.SUCCESS
          ); 
          console.info('Completed'),
          this.router.navigate(['/users/management']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
