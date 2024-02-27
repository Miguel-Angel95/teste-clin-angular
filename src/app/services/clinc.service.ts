import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClincDTO } from '../dtos/clinc.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClincService {
  apiUrl = 'http://localhost:3001/clinic';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createClinic(clinicData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, clinicData, { headers });
  }

  getAllClincs(page: number, limit: number, search: any): Observable<any[]> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search.toString());
    return this.http.get<any[]>(this.apiUrl, { headers, params });
  }

  getClinicById(clinicId: number): Observable<ClincDTO> {
    const url = `${this.apiUrl}/${clinicId}`;
    const headers = this.getHeaders();
    return this.http.get<ClincDTO>(url, { headers });
  }

  updateClinic(clinicData: ClincDTO): Observable<any> {
    const url = `${this.apiUrl}/${clinicData.id}`;
    const headers = this.getHeaders();
    return this.http.put<any>(url, clinicData, { headers });
  }

  deleteClinic(clinicId: number): Observable<any> {
    const url = `${this.apiUrl}/${clinicId}`;
    const headers = this.getHeaders();
    return this.http.delete<any>(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.accessToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }
}
