import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    if (this.authService.getCurrentUser() != null) {
      this.router.navigate(['/']);
    }


    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: false
    });
  }



  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl ?? '/';
  }


  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f.username.value , this.f.password.value)
      .subscribe(user =>
    {
      if (user!= null)
      {
        if (this.f.rememberMe.value) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        else {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
      }
      this.router.navigate([this.returnUrl]);
    });


  }
}
