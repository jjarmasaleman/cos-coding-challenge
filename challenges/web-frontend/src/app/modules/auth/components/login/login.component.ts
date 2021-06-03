import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@controls/notification';
import { accessDenied, AuthState, currentUser, Login } from '@core/state';
import { AuthService, User } from '@modules/auth';
import { Auth } from '@modules/auth/interfaces/auth.interface';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private returnUrl: string;
  private user: User | undefined;
  private unsubscribe: Subject<void>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationService,
    private store: Store<AuthState>,
    private builder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({});
    this.returnUrl = '';

    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.store.pipe(select(currentUser), takeUntil(this.unsubscribe)).subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.store.pipe(select(accessDenied), takeUntil(this.unsubscribe)).subscribe((noAccess) => {
      if (noAccess) {
        this.notificationsService.showNotification('Access denied. Please contact your help desk for more information');
      }
    });

    this.route.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      this.returnUrl = params.returnUrl || '/auctions';
    });

    this.loadComponent();
  }

  public submit(): void {
    // Prevents re-login
    if (this.user) {
      this.router.navigate([this.returnUrl], { state: { alreadyLoggedIn: true } });

      return;
    }

    const valid = this.validate();
    if (!valid) {
      this.notificationsService.showNotification('Invalid email or password');

      // A form with invalid status should not be saved
      return;
    }

    this.authService
      .login(this.form.controls.username.value.trim(), this.form.controls.password.value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((auth: Auth) => {
        this.authenticate(auth);
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private validate(): boolean {
    this.form.markAllAsTouched();

    return this.form.valid;
  }

  private authenticate(auth: Auth): void {
    this.store.dispatch(new Login({ auth }));

    // Route back to the provided URL and query parameters
    this.router.navigateByUrl(this.returnUrl);
  }

  private loadComponent(): void {
    const validators = [] as ValidatorFn[];
    validators.push(Validators.required);

    const username = new FormControl();
    username.setValidators(Validators.compose(validators));
    username.setValue('');

    const password = new FormControl();
    password.setValidators(Validators.compose(validators));
    password.setValue('');

    this.form = this.builder.group({ username, password });
  }
}
