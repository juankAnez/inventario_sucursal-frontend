import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  // Profiles
  getProfiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profiles/`);
  }

  getProfileById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profiles/${id}/`);
  }

  createProfile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profiles/`, data);
  }

  updateProfile(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profiles/${id}/`, data);
  }

  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profiles/${id}/`);
  }
}