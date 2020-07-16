import {Component, OnInit} from '@angular/core';
import {LoginService} from './service/login.service';
import {OnDestroyMixin} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends OnDestroyMixin implements OnInit {

  constructor(private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {

  }
}
