import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  // Categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}/`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/`, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}/`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}/`);
  }

  // Suppliers
  getSuppliers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/suppliers/`);
  }

  getSupplierById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/suppliers/${id}/`);
  }

  createSupplier(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/suppliers/`, data);
  }

  updateSupplier(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/suppliers/${id}/`, data);
  }

  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/suppliers/${id}/`);
  }

  // Products
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}/`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/`, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}/`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}/`);
  }
}