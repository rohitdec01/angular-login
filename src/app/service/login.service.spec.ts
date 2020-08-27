import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie';

describe('LoginService', () => {
  const dummy: any = '';
  const cookieService: CookieService = new CookieService(dummy);

  let loginService: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        {provide: CookieService, useValue: cookieService},
      ]
    });
    loginService = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('get test should call http client', () => {
    const data = 'test123';
    loginService.test().subscribe(val => {
      expect(val).toEqual(data);
    });

    const request = httpMock.expectOne(loginService.testLocal);
    expect(request.request.method).toEqual('GET');
    request.flush(data);
  });

  it('post login should call http client', () => {
    const jwt = 'token';
    loginService.login().subscribe(val => {
      expect(val).toEqual(jwt);
    });

    const request = httpMock.expectOne(loginService.authTokenURLocal);
    expect(request.request.method).toEqual('POST');
    request.flush(jwt);
  });
});
