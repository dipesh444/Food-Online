import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  registrationForm!: FormGroup;
  constructor(private fb:FormBuilder,
    private userService:UserService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.registrationForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      address:[''],
      password:[''],
      isAdmin:[false]
    })
  }

  save() {    
    this.userService.register(this.registrationForm.value).subscribe((res)=>{
      this.router.navigateByUrl('/')
    },
    (err)=>{
      this.errorMessage = err.error.message
    }
  )
  }
}
