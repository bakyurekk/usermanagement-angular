import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './helpers/interceptors/auth.interceptor';
import { AuthenticationGuard } from './helpers/guards/authentication.guard';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AlertifyService } from './services/alertify.service';

import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';

@NgModule({
  declarations: [

    // LAYOUT
    
    AppComponent,
    AuthLayoutComponent, 
    BaseLayoutComponent

    //


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 6000,
      closeButton: true,
      positionClass: 'toast-top-right',
      progressBar: true,
      easing: 'ease-in',
      easeTime: 300,
      enableHtml: true,

      progressAnimation: 'decreasing',
      preventDuplicates: false,
    }), // ToastrModule added,
  ],
  providers: [
    AlertifyService,
    AuthenticationGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
