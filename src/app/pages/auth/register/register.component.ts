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
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm!: FormGroup;
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
    this.createRegisterForm();
  }


  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['/users/management'])
    }
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
    });

    this.cdr.markForCheck();
  }

  get f() {
    return this.registerForm.controls;
  }

  public register() {
    this.isSubmit = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.valid) {
      this.loading = true;
      let userData = Object.assign({}, this.registerForm.value);

      console.log(userData);

      this.authenticationService.register(userData).subscribe({
        next: (response: User) => {
          this.loading = true;
          this.alertifyService.success(
            `A new account was created for ${response.firstName}. Please check your email for passowrd to log in.`,
             AlertifyType.SUCCESS
           ); 
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
          console.info('Completed'),
          this.router.navigate(['/auth/login']);

          this.cdr.markForCheck();
        }
      });
    }
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  
  
}
