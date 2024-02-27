import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClincDTO } from 'src/app/dtos/clinc.dto';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { ClincService } from 'src/app/services/clinc.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  clinics: ClincDTO[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 12;

  constructor(
    private clincService: ClincService,
    private toastService: ToastService,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.authService.accessToken();
    if (!token) {
      this.route.navigate(['/']);
      return;
    }

    this.loadClinics();
  }

  loadClinics() {
    this.clincService
      .getAllClincs(this.currentPage, this.itemsPerPage, this.searchTerm)
      .subscribe({
        next: (response: any) => {
          this.clinics = response.clinics;
          this.totalPages = response.totalPages;
        },
        error: (err: any) => {
          this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
        },
      });
  }

  searchClinic() {
    if (this.searchTerm.trim() !== '') {
      this.clincService
        .getAllClincs(1, this.itemsPerPage, this.searchTerm)
        .subscribe({
          next: (response: any) => {
            this.clinics = response.clinics;
            this.totalPages = response.totalPages;
          },
          error: (err: any) => {
            this.toastService.showError(`Erro ao pesquisar clínicas`);
          },
        });
    } else {
      this.loadClinics();
    }
  }

  redirectNewClinc() {
    this.route.navigate([RoutesEnum.SESSION_NEW_CLINC]);
  }

  editedClinic(clinicId: any) {
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clinicId}`]);
  }

  deleteClinic(clinicId: number | undefined) {
    if (clinicId !== undefined) {
      if (confirm('Tem certeza que deseja excluir essa clínica?')) {
        this.clincService.deleteClinic(clinicId).subscribe(
          () => {
            this.toastService.showSuccess('Clínica excluída com sucesso!');
            this.loadClinics();
          },
          (error) => {
            console.error('Erro ao excluir clínica:', error);
            this.toastService.showError('Erro ao excluir clínica');
          }
        );
      }
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.loadClinics();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadClinics();
    }
  }
}
