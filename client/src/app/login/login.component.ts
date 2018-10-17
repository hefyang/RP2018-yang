import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  previousSection: string;

  clicked: boolean;
  form:FormGroup;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router) {

    this.title = 'Sign In';
    this.previousSection = 'main';

    this.clicked = false;

    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    this.clicked = true;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(res => {
          console.log(res);           // Temp

          if (res.idToken) {
            this.router.navigate([''])
              .then(() => {
                console.log("User is logged in");   // Temp
              });
          } else {
            console.log("Fail!");                   // Temp
          }
        })
    }
  }

  ngOnInit() {
  }

}
