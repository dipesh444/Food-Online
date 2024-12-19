import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInfo!: User
  isLoggedIn = false;
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.userObservable.subscribe((userData:User)=>{
      this.userInfo = userData;
      this.isLoggedIn = userData.token ? true:false;
    })
  }

  logOut() {

    this.userService.logOut()
  }
}
