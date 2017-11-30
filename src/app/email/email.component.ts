import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  email;
  password;
  error;

  constructor(public auth: AuthService) {
  }


  ngOnInit() {
  }

}
