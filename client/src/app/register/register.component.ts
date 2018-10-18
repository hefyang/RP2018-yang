import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidationService} from "../_validators/form-validation.service";
import {RegistrationService} from "../_services/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title: string;
  previousSection: string;

  clicked: boolean;
  formModel: FormGroup;

  constructor(
    private fb:FormBuilder,
    private validator:FormValidationService,
    private registration:RegistrationService, private router:Router) {

    this.title = 'Sign Up';
    this.previousSection = 'login';

    this.clicked = false;

    this.formModel = fb.group({
      'username': ['', Validators.compose([
        Validators.required]),
        // validator.asyncStudentIdValidator(this.registration)
      ],
      // 'email': ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')])
      // ],
      'passwordsGroup': fb.group({
        'password': ['', Validators.compose([
          Validators.required,
          Validators.minLength(8)])
        ],
        'confirmPw': ['', Validators.required]
        }, {
        validator: validator.passwordEqualValidation
      })
    });
  }

  onSubmit() {
    this.clicked = true;

    if (this.formModel.valid) {
      this.registration.register({
        username: this.formModel.get('username').value,
        // email: this.formModel.get('email').value,
        password: this.formModel.get('passwordsGroup.password').value
      }).subscribe(res => {
        this.router.navigate(['login'])
          .then(() => {
            console.log(res);
          })
      });
    }
  }

  ngOnInit() {
  }

}
