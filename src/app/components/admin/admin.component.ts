import { Component, OnInit } from '@angular/core';
import {Theme} from '../../_models/Theme';
import {ThemeService} from '../../_services/theme.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usernameForm: FormGroup;

  submitted: boolean = false;
  result: any = null;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.usernameForm = formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  addUserToModers(): void {
    this.submitted = true;

    this.userService.addUserToModers(this.usernameForm.controls.username.value).subscribe(result => {
      this.result = result;
    });
  }


}
