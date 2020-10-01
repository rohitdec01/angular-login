import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginService} from '../service/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

class Organization {
  orgKey: number;
  orgValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends OnDestroyMixin implements OnInit {

  @Output() loginValueEmitter = new EventEmitter<any>();
  @Input() requiredErrorMessage: string;

  loginForm: FormGroup;
  submitted = false;
  selectedOrg = 3;
  organizationMetadata: Organization[] = [
    {orgKey: 1, orgValue: 'org 1'},
    {orgKey: 2, orgValue: 'org 2'},
    {orgKey: 3, orgValue: 'org 3'},
    {orgKey: 4, orgValue: 'org 4'},
    {orgKey: 5, orgValue: 'org 5'},
  ];

  constructor(public loginService: LoginService, private formBuilder: FormBuilder) {
    super();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.pattern('[ -~]*')])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[ -~]*')])],
      organization: ['', Validators.compose(([
        Validators.required,
      ]))]
    });
    console.log(this.requiredErrorMessage);
  }

  loginHandler() {
    this.submitted = true;
    console.log(this.loginForm.value.email, 'OR', this.loginForm.get('email').value); // OR
    this.loginValueEmitter.emit(this.loginForm.value); // for testing only.

    this.loginService.login()
      .pipe(untilComponentDestroyed(this))
      .subscribe(token => {
        this.loginService.saveToken(token.jwt);
      });
  }

  onOrganizationChange(target: any) {
    console.log(target.value);
  }
}
