import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClincDTO } from 'src/app/dtos/clinc.dto';
import { ClincService } from 'src/app/services/clinc.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss'],
})
export class PageInfoComponent implements OnInit {
  form!: FormGroup;
  clinicId: number | null = null;
  buttonLabel: string = 'Cadastrar';

  constructor(
    private activateRoute: ActivatedRoute,
    private clinicService: ClincService,
    private router: Router,
    private toastService: ToastService,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nomeClinica: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      nomeResponsavel: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
      ]),
      cep: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$'),
      ]),
      uf: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]),
      cidade: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      longradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', []),
      complemento: new FormControl('', []),
    });

    const paramRaw = this.activateRoute.snapshot.paramMap.get('id');

    this.clinicId = paramRaw ? parseInt(paramRaw) : null;
    this.buttonLabel = this.clinicId ? 'Salvar' : 'Cadastrar';

    if (this.clinicId) {
      this.clinicService.getClinicById(this.clinicId).subscribe(
        (clinic: ClincDTO) => {
          this.form.patchValue(clinic);
        },
        (error) => {
          console.error('Erro ao carregar clínica:', error);
        }
      );
    }
  }

  get nomeClinica() {
    return this.form.get('nomeClinica')!;
  }

  get nomeResponsavel() {
    return this.form.get('nomeResponsavel')!;
  }

  get telefone() {
    return this.form.get('telefone')!;
  }

  get cep() {
    return this.form.get('cep')!;
  }

  get uf() {
    return this.form.get('uf')!;
  }

  get cidade() {
    return this.form.get('cidade')!;
  }

  get bairro() {
    return this.form.get('bairro')!;
  }
  get longradouro() {
    return this.form.get('longradouro')!;
  }
  get numero() {
    return this.form.get('numero')!;
  }

  get complemento() {
    return this.form.get('complemento')!;
  }

  formSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const bodySubmit: ClincDTO = {
      id: this.clinicId ?? undefined,
      nomeClinica: this.form.get('nomeClinica')?.value,
      nomeResponsavel: this.form.get('nomeResponsavel')?.value,
      telefone: this.form.get('telefone')?.value,
      cep: this.form.get('cep')?.value,
      uf: this.form.get('uf')?.value,
      cidade: this.form.get('cidade')?.value,
      bairro: this.form.get('bairro')?.value,
      longradouro: this.form.get('longradouro')?.value,
      numero: this.form.get('numero')?.value,
      complemento: this.form.get('complemento')?.value,
    };

    if (this.clinicId) {
      this.clinicService.updateClinic(bodySubmit).subscribe(
        (response) => {
          this.router.navigate(['/session/list']);
          this.toastService.showSuccess('Clínica atualizada com sucesso!');
        },
        (error) => {
          console.error('Erro ao atualizar clínica:', error);
        }
      );
    } else {
      this.clinicService.createClinic(bodySubmit).subscribe(
        (response) => {
          this.router.navigate(['/session/list']);
          this.toastService.showSuccess('Clínica criada com sucesso!');
        },
        (error) => {
          console.error('Erro ao criar clínica:', error);
        }
      );
    }
  }

  searchCep() {
    const cep = this.form.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.cepService.getAddressByCep(cep).subscribe((data: any) => {
        this.form.patchValue({
          uf: data.uf,
          cidade: data.localidade,
          bairro: data.bairro,
          longradouro: data.logradouro,
        });
      });
    }
  }

  googleMaps() {
    const address = `${this.form.value.longradouro}, ${this.form.value.numero}, ${this.form.value.bairro}, ${this.form.value.cidade}, ${this.form.value.uf}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(url, '_blank');
  }
}
