import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import {MustMatch} from '../../_validators/validators';
import {UserToRegister} from '../../_models/UserToRegister';
import {User} from '../../_models/User';
import {RegistrationResult} from '../../_models/RegistrationResult';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  result: RegistrationResult;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {return this.registerForm.controls};

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;


    if (this.registerForm.invalid) {
      return;
    }

    let user = {
      username: this.f.username.value,
      password: this.f.password.value,
      email: this.f.email.value
    } as UserToRegister;

    this.userService.register(user).subscribe(result =>
    {
      this.result = result;
      console.log('JSON RESULT ' + JSON.stringify(result));
      if (this.result.succeeded)
      {
        alert('Thanks for the registration!');
        this.router.navigate(['/login']);
      }
    });

  }



}
