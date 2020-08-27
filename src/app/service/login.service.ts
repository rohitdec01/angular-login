import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Heroku Server
  userDetail = 'https://auth-jwt-rohitdec01.herokuapp.com/dashboardUserDetail';
  authTokenURL = 'https://auth-jwt-rohitdec01.herokuapp.com/authenticate';

  // local Server
  userDetailLocal = 'http://localhost:8083/dashboardUserDetail';
  authTokenURLocal = 'http://localhost:8083/authenticate';
  testLocal = 'http://localhost:8083/test';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  test(): Observable<any> {
    return this.http.get(this.testLocal);
  }

  login(): Observable<any> {
    return this.http.post(this.authTokenURLocal,
      {
        username: 'test',
        password: 'test'
      });
  }

  saveToken(jwt: string) {
    this.cookieService.put('jwt-token', jwt);
  }

  logOut() {
    this.cookieService.remove('jwt-token');
    // redirect to login page
  }
}
