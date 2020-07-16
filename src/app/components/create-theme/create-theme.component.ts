import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ThemeService} from '../../_services/theme.service';
import {Router} from '@angular/router';
import {TagsCount} from '../../_validators/validators';
import {UserToRegister} from '../../_models/UserToRegister';
import {Theme} from '../../_models/Theme';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css']
})
export class CreateThemeComponent implements OnInit {
  createThemeForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.createThemeForm = formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      text: ['', [Validators.required, Validators.maxLength(3000)]],
      tags: ['', [Validators.required]]
      },
      {
        validators: TagsCount(5)
      }
    )
  }

  ngOnInit(): void {
  }


  get f() {return this.createThemeForm.controls};

  onSubmit(): void {
    this.submitted = true;


    if (this.createThemeForm.invalid) {
      return;
    }

    let theme = {
      title: this.f.title.value,
      text: this.f.text.value,
      hashtags: this.f.tags.value.split(' ')
    }


    this.themeService.createTheme(theme).subscribe( createdTheme => {
        this.router.navigate([`/theme/${createdTheme.id}`]);
    })
  }

}
