import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private router:Router,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  public async logOut(){
    await this.authenticationService.logOut();
    this.router.navigate(['/auth/login'])
  }
}
