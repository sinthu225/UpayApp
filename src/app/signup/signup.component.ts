import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public auth: AuthService) { }



  email;
  password;
  pnum;
  displayName;

  ngOnInit() {
  }

}
