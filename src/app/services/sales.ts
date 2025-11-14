import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:8000/api/sales';

  constructor(private http: HttpClient) { }

  // Batches
  getBatches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/batches/`);
  }

  getBatchById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/batches/${id}/`);
  }

  createBatch(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/batches/`, data);
  }

  updateBatch(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/batches/${id}/`, data);
  }

  deleteBatch(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/batches/${id}/`);
  }

  // Stocks
  getStocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stocks/`);
  }

  getStockById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/stocks/${id}/`);
  }

  createStock(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/stocks/`, data);
  }

  updateStock(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/stocks/${id}/`, data);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/stocks/${id}/`);
  }

  // Movements
  getMovements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movements/`);
  }

  getMovementById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movements/${id}/`);
  }

  createMovement(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/movements/`, data);
  }

  updateMovement(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/movements/${id}/`, data);
  }

  deleteMovement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movements/${id}/`);
  }
}