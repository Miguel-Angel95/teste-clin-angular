import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/dtos/clinc.dto';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './creatse-user.component.html',
  styleUrls: ['./creatse-user.component.scss'],
})
export class CreatseUserComponent implements OnInit {
  userForm!: FormGroup;
  user: UserDto = {
    name: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.+@mail\.com$/i),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get cpf() {
    return this.userForm.get('cpf')!;
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber')!;
  }
  get password() {
    return this.userForm.get('password')!;
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }

    this.user = this.userForm.value;
    this.authService.createUser(this.user).subscribe(
      (response) => {
        this.router.navigate(['login']);
        this.toastService.showSuccess('Conta criada com sucesso!');
      },
      (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    );
  }

  redirectLogin() {
    this.router.navigate(['home']);
  }
}
