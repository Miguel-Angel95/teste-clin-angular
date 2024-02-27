import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent {
  form!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      identifier: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get identifier() {
    return this.form.get('identifier')!;
  }
  get password() {
    return this.form.get('password')!;
  }

  login() {
    const { identifier: cpf, password } = this.form.value;

    this.authService.login(cpf, password).subscribe({
      next: (value: any) => {
        this.authService.token(value.accessToken);

        this.router.navigate([RoutesEnum.SESSION_LIST]);
        this.toastService.showSuccess('Login realizado com sucesso');
      },
      error: (err: any) => {
        this.toastService.showError(err?.error?.message);
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
