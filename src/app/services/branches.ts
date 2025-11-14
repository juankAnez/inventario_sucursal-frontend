import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private apiUrl = 'http://localhost:8000/api/branches';

  constructor(private http: HttpClient) { }

  // Branches
  getBranches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/branches/`);
  }

  getBranchById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/branches/${id}/`);
  }

  createBranch(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/branches/`, data);
  }

  updateBranch(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/branches/${id}/`, data);
  }

  deleteBranch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/branches/${id}/`);
  }

  // Warehouses
  getWarehouses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/warehouses/`);
  }

  getWarehouseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/warehouses/${id}/`);
  }

  createWarehouse(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/warehouses/`, data);
  }

  updateWarehouse(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/warehouses/${id}/`, data);
  }

  deleteWarehouse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/warehouses/${id}/`);
  }

  // Locations
  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/locations/`);
  }

  getLocationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/locations/${id}/`);
  }

  createLocation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations/`, data);
  }

  updateLocation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/locations/${id}/`, data);
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locations/${id}/`);
  }
}