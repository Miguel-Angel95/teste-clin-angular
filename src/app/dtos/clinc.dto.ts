export interface ClincDTO {
  id?: number;
  nomeClinica: string;
  telefone: string;
  nomeResponsavel: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  longradouro: string;
  numero?: string;
  complemento?: string;
}

export interface UserDto {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  password: string;
}
