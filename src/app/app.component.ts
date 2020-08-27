import {Component} from '@angular/core';
import {OnDestroyMixin} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends OnDestroyMixin {
  requiredErrorMessage =  'Email is required';

  constructor() {
    super();
  }

  loginValueEmitterhandler(loginValues: any) {
    console.log(loginValues.email);
    console.log(loginValues.password);
  }
}
