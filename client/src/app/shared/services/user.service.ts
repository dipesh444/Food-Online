import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IRegistration } from '../interfaces/IRegistration';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../model/User';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../constant/url';
import { ILogin } from '../interfaces/ILogin';

const USER_KEY="user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject=new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>
  constructor(private _http:HttpClient) {
    this.userObservable = this.userSubject.asObservable()
   }

   public get currentUser() {
    return this.userSubject.value
   }

  login(userLogin:ILogin):Observable<User> {
    return this._http.post<User>(USER_LOGIN_URL,userLogin).
    pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user)
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    )
  }

  logOut() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  register(userRegister:IRegistration):Observable<User> {
    return this._http.post<User>(USER_REGISTER_URL,userRegister)
    .pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user)
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    )
  }

  setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  }

  getUserFromLocalStorage():User {

    const userJson=localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User
    return new User()
  }
}
