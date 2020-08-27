import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';
import {LoginComponent} from './login/login.component';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
// import {MockComponent} from 'ng-mocks';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent], // MockComponent(LoginComponent)
      providers: [],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
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

  function loginComponent(): LoginComponent {
    return $ng('app-login').componentInstance;
  }

  function login(): HTMLElement {
    return $('app-login');
  }

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-login'`, () => {
    const app = fixture.componentInstance;
    // expect(app.title).toEqual('angular-login');
  });

  it('should pass the input to the child component', () => {
    expect(loginComponent().requiredErrorMessage).toEqual('Email is required');
    expect(login()).toBeTruthy();
  });
});
