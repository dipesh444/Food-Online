import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  errorMessage = '';
  constructor(private userService:UserService,
    private fb:FormBuilder,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  save() {
    this.userService.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('/')
    },
    (error)=>{
      console.error(error.error.message);
      
    }
  )
  }
}
