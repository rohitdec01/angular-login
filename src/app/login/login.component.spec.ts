import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {LoginService} from '../service/login.service';
import {of} from 'rxjs';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;
  let loginService: jasmine.SpyObj<LoginService>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('loginService', ['login', 'saveToken']);
    loginService.login.and.returnValue(of('{jwt:token}'));

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: LoginService, useValue: loginService},
        {provide: FormBuilder, useValue: formBuilder},
      ],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    nativeElement = fixture.debugElement.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  function $ng(selector: string): DebugElement {
    return debugElement.query(By.css(selector));
  }

  function $(selector: string): HTMLElement {
    return nativeElement.querySelector(selector);
  }

  function fillIn(selector: string, value: string) {
    const input = nativeElement.querySelector(selector) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('keyup'));
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function clickOn(selector: string | HTMLElement) {
    if (selector instanceof HTMLElement) {
      selector.click();
    } else {
      $(selector).click();
    }
    fixture.detectChanges();
  }

  let loginSpy;
  beforeEach(() => {
    loginSpy = spyOn(fixture.componentInstance, 'loginHandler').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('user form validations', () => {
    it('should verify login button and text input initial state', () => {
      expect($('.email').innerText).toEqual('');
      expect($('.password').innerText).toEqual('');
      expect(fixture.componentInstance.loginForm.invalid).toBeTruthy();

      expect(($('button') as HTMLButtonElement).disabled).toBeTruthy();

      expect(loginSpy).not.toHaveBeenCalled();
      expect(loginService.login).not.toHaveBeenCalled();
    });

    it('should show valid input messages.', () => {
      fillIn('.email', '');
      fillIn('.password', '');

      expect(fixture.componentInstance.loginForm.get('email').errors.required).toBeTruthy();
      expect(fixture.componentInstance.loginForm.get('password').errors.required).toBeTruthy();

      fillIn('.email', 'test');
      fillIn('.password', 'te');
      expect(fixture.componentInstance.loginForm.get('email').errors.minlength).toBeTruthy();
      expect(fixture.componentInstance.loginForm.get('password').errors.minlength).toBeTruthy();

      fillIn('.email', 'test123');
      fillIn('.password', 'test');
      expect(fixture.componentInstance.loginForm.get('email').errors.email).toBeTruthy();

      expect(loginSpy).not.toHaveBeenCalled();
      expect(fixture.componentInstance.loginForm.valid).toBeFalsy();
    });
  });

  describe('user form valid inputs', () => {
    it('should submit the login form', () => {
      fillIn('.email', 'test@test.com');
      fillIn('.password', 'test');

      expect(($('button') as HTMLButtonElement).disabled).toBeFalsy();
      clickOn('button');
      expect(loginSpy).toHaveBeenCalled();
      expect(loginService.login).toHaveBeenCalled();
      expect(loginService.saveToken).toHaveBeenCalled(); // check how to call with login() return value.
    });

    it('should emit event on login click', () => {
      fillIn('.email', 'test@test.com');
      fillIn('.password', 'password');
      const loginEmitter = spyOn(fixture.componentInstance.loginValueEmitter, 'emit');

      clickOn('.login');
      expect(loginEmitter).toHaveBeenCalledWith(fixture.componentInstance.loginForm.value);
    });
  });

});
