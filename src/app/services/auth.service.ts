import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserDto } from '../dtos/clinc.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

  // TODO: Mapear DTOs para retorno do Backend
  login(cpf: string, password: string): Observable<any[]> {
    return this.http
      .post<any>(`${environment.API_URL}/auth/login`, {
        cpf,
        password,
      })
      .pipe(retry(1));
  }

  createUser(user: UserDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  token(token: string): void {
    localStorage.setItem('access_token', token);
  }

  accessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
