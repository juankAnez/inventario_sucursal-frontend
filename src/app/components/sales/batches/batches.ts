import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SalesService } from '../../../services/sales';
import { ProductsService } from '../../../services/products';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './batches.html',
  styleUrl: './batches.css'
})
export class Batches implements OnInit {
  batches: any[] = [];
  products: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  batch: any = {
    id: null,
    batch_number: '',
    product: null,
    manufacturing_date: null,
    expiration_date: null,
    initial_quantity: 0,
    current_quantity: 0
  };

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadBatches();
    this.loadProducts();
  }

  loadBatches() {
    this.loading = true;
    this.salesService.getBatches().subscribe({
      next: (data) => {
        this.batches = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading batches:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los lotes'
        });
        this.loading = false;
      }
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((product: any) => ({
          label: product.name,
          value: product.id
        }));
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  openNew() {
    this.batch = {
      id: null,
      batch_number: '',
      product: null,
      manufacturing_date: '',
      expiration_date: '',
      initial_quantity: 0,
      current_quantity: 0
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editBatch(batch: any) {
    this.batch = {
      ...batch,
      manufacturing_date: batch.manufacturing_date ? batch.manufacturing_date.split('T')[0] : '',
      expiration_date: batch.expiration_date ? batch.expiration_date.split('T')[0] : ''
    };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteBatch(batch: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el lote "${batch.batch_number}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.salesService.deleteBatch(batch.id).subscribe({
          next: () => {
            this.loadBatches();
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Lote eliminado exitosamente'
            });
          },
          error: (error) => {
            console.error('Error deleting batch:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el lote'
            });
          }
        });
      }
    });
  }

  saveBatch() {
    if (!this.batch.batch_number?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El número de lote es requerido'
      });
      return;
    }

    if (!this.batch.product) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El producto es requerido'
      });
      return;
    }

    if (!this.batch.manufacturing_date) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La fecha de fabricación es requerida'
      });
      return;
    }

    if (this.batch.initial_quantity <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La cantidad inicial debe ser mayor a 0'
      });
      return;
    }

    // Prepare data for API
    const batchData = {
      ...this.batch,
      current_quantity: this.isEditMode ? this.batch.current_quantity : this.batch.initial_quantity
    };

    if (this.isEditMode) {
      this.salesService.updateBatch(this.batch.id, batchData).subscribe({
        next: () => {
          this.loadBatches();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Lote actualizado exitosamente'
          });
        },
        error: (error) => {
          console.error('Error updating batch:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el lote'
          });
        }
      });
    } else {
      this.salesService.createBatch(batchData).subscribe({
        next: () => {
          this.loadBatches();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Lote creado exitosamente'
          });
        },
        error: (error) => {
          console.error('Error creating batch:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el lote'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.value === productId);
    return product ? product.label : 'N/A';
  }
}