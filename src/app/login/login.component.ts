import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends OnDestroyMixin implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(public loginService: LoginService, private formBuilder: FormBuilder) {
    super();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[ -~]*')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('[ -~]*')])],
    });
  }

  loginHandler() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login()
      .pipe(untilComponentDestroyed(this))
      .subscribe(str => {
        console.log('jwt token:', str.jwt);
      });
  }
}
