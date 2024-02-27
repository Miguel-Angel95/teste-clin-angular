import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-secure-area',
  templateUrl: './secure-area.component.html',
  styleUrls: ['./secure-area.component.scss'],
})
export class SecureAreaComponent implements OnInit {
  constructor(private router: Router, private toastService: ToastService) {}

  loggedUser = 'Usuário logado';

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('@USERID');

    this.router.navigate(['/home']);
    this.toastService.showError('Você foi deslogado!');
  }

  ngOnInit() {}
}
