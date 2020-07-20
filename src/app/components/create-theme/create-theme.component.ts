import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ThemeService} from '../../_services/theme.service';
import {Router} from '@angular/router';
import {TagsCount} from '../../_validators/validators';
import {UserToRegister} from '../../_models/UserToRegister';
import {Theme} from '../../_models/Theme';
import {SpecificTheme} from '../../_models/SpecificTheme';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css']
})
export class CreateThemeComponent implements OnInit {
  createThemeForm: FormGroup;
  submitted: boolean = false;


  @Input() createTheme: SpecificTheme = new SpecificTheme();
  @Output() onPost = new EventEmitter<SpecificTheme>();

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

    this.createTheme.title = this.f.title.value;
    this.createTheme.text = this.f.text.value;
    this.createTheme.hashtags = this.f.tags.value.split(' ');

    console.log("HERE");

    if (this.createTheme.id)
    {
      this.themeService.updateTheme(this.createTheme).subscribe( updatedTheme => {
        this.onPost.emit(this.createTheme);
        this.router.navigate([`theme/${updatedTheme.id}/1`]);
      })
    }
    else
    {
      this.themeService.createTheme(this.createTheme).subscribe( createdTheme => {
        console.log("HERE");
        this.router.navigate([`theme/${createdTheme.id}/1`]);
      })
    }

  }

}
