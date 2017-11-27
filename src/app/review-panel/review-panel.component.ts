import { Component, OnInit, Input } from '@angular/core';
import { Ratingservice } from '../star.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.scss']
})
export class ReviewPanelComponent implements OnInit {

  @Input() userId;
  @Input() productIdA;
  user;

  constructor(public auth: AuthService, private _ratingService: Ratingservice) { }

  ngOnInit() {
    this.auth.user.subscribe(
      res => this.user = res           
    );  
  }

  ratingHandler(value) {
    this._ratingService.setRating(this.userId, this.productIdA, value, this.user.displayName)
  }

}
