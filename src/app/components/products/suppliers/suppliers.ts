import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductsService } from '../../../services/products';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    Dialog,
    InputText,
    Toast,
    ConfirmDialog
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css'
})
export class Suppliers implements OnInit {
  suppliers: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  
  supplier: any = {
    id: null,
    name: '',
    contact: '',
    phone: '',
    email: ''
  };

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading = true;
    this.productsService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load suppliers'
        });
        this.loading = false;
      }
    });
  }

  openNew() {
    this.supplier = { id: null, name: '', contact: '', phone: '', email: '' };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editSupplier(supplier: any) {
    this.supplier = { ...supplier };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteSupplier(supplier: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete supplier "${supplier.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.productsService.deleteSupplier(supplier.id).subscribe({
          next: () => {
            this.loadSuppliers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Supplier deleted successfully'
            });
          },
          error: (error) => {
            console.error('Error deleting supplier:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete supplier'
            });
          }
        });
      }
    });
  }

  saveSupplier() {
    if (!this.supplier.name.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Name is required'
      });
      return;
    }

    if (!this.supplier.email.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Email is required'
      });
      return;
    }

    if (this.isEditMode) {
      this.productsService.updateSupplier(this.supplier.id, this.supplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Supplier updated successfully'
          });
        },
        error: (error) => {
          console.error('Error updating supplier:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update supplier'
          });
        }
      });
    } else {
      this.productsService.createSupplier(this.supplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Supplier created successfully'
          });
        },
        error: (error) => {
          console.error('Error creating supplier:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create supplier'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }
}