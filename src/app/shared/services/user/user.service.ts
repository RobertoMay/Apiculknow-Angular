import { Injectable } from '@angular/core';
import { User } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  registerUser(form: User): Observable<any> {
    let direction = this.url + "/users/api/register";
    return this.http.post<any>(direction, form);
  }

}
