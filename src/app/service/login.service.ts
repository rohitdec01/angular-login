import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  constructor(private http: HttpClient) {
  }

  login(): Observable<any> {
    return this.http.post(this.authTokenURLocal,
      {
        userName: 'test',
        password: 'test'
      });
  }
}
