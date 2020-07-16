import {FormControl, FormGroup} from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}


export function TagsCount(maxCount: number) {
  return (formGroup: FormGroup) => {
    const tags = formGroup.controls['tags'];
    if (tags.errors)
    {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (tags.value.split(' ').length > 5)
    {
      tags.setErrors({ tagsCount: true });
    }
    else
    {
      tags.setErrors(null);
    }
  }
}
