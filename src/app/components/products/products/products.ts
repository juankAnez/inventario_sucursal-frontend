import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
// QUITAR: import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductsService } from '../../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    TagModule,
    DialogModule,
    InputTextModule,
    // QUITAR: InputTextareaModule,
    InputNumberModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  
  product: any = {
    id: null,
    code: '',
    name: '',
    description: '',
    category: null,
    purchase_price: 0,
    sale_price: 0,
    is_active: true
  };

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products'
        });
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.productsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id
        }));
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  openNew() {
    this.product = {
      id: null,
      code: '',
      name: '',
      description: '',
      category: null,
      purchase_price: 0,
      sale_price: 0,
      is_active: true
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete product "${product.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.productsService.deleteProduct(product.id).subscribe({
          next: () => {
            this.loadProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deleted successfully'
            });
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete product'
            });
          }
        });
      }
    });
  }

  saveProduct() {
    if (!this.product.code.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Product code is required'
      });
      return;
    }

    if (!this.product.name.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Product name is required'
      });
      return;
    }

    if (!this.product.category) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Category is required'
      });
      return;
    }

    if (this.product.purchase_price <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Purchase price must be greater than 0'
      });
      return;
    }

    if (this.product.sale_price <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Sale price must be greater than 0'
      });
      return;
    }

    if (this.product.sale_price < this.product.purchase_price) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Sale price should be greater than purchase price'
      });
      return;
    }

    if (this.isEditMode) {
      this.productsService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.loadProducts();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated successfully'
          });
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update product'
          });
        }
      });
    } else {
      this.productsService.createProduct(this.product).subscribe({
        next: () => {
          this.loadProducts();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product created successfully'
          });
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create product'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.value === categoryId);
    return category ? category.label : 'N/A';
  }
}