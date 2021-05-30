import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router, private builder: FormBuilder) {
    this.form = new FormGroup({});
  }

  public ngOnInit(): void {
    this.loadComponent();
  }

  public submit(): void {
    const valid = this.validate();
    if (!valid) {
      // A form with invalid status should not be saved
      return;
    }
  }

  private validate(): boolean {
    this.form.markAllAsTouched();

    return this.form.valid;
  }

  private loadComponent(): void {
    const validators = [] as ValidatorFn[];

    validators.push(Validators.required);

    const username = new FormControl();
    username.setValue('');
    username.setValidators(Validators.compose(validators));

    const password = new FormControl();
    password.setValue('');
    password.setValidators(Validators.compose(validators));

    this.form = this.builder.group({ username, password });
  }
}
