import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SalesService } from '../../../services/sales';
import { ProductsService } from '../../../services/products';
import { BranchesService } from '../../../services/branches';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    TagModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css'
})
export class Stocks implements OnInit {
  stocks: any[] = [];
  products: any[] = [];
  branches: any[] = [];
  locations: any[] = [];
  batches: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  
  stock: any = {
    id: null,
    product: null,
    branch: null,
    location: null,
    batch: null,
    quantity: 0,
    minimum_quantity: 0
  };

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    private branchesService: BranchesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadStocks();
    this.loadProducts();
    this.loadBranches();
    this.loadLocations();
    this.loadBatches();
  }

  loadStocks() {
    this.loading = true;
    this.salesService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stocks:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load stocks'
        });
        this.loading = false;
      }
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((prod: any) => ({
          label: prod.name,
          value: prod.id
        }));
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  loadBranches() {
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        this.branches = data.map((branch: any) => ({
          label: branch.name,
          value: branch.id
        }));
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  loadLocations() {
    this.branchesService.getLocations().subscribe({
      next: (data) => {
        this.locations = data.map((loc: any) => ({
          label: loc.code,
          value: loc.id
        }));
      },
      error: (error) => {
        console.error('Error loading locations:', error);
      }
    });
  }

  loadBatches() {
    this.salesService.getBatches().subscribe({
      next: (data) => {
        this.batches = data.map((batch: any) => ({
          label: batch.batch_number,
          value: batch.id
        }));
      },
      error: (error) => {
        console.error('Error loading batches:', error);
      }
    });
  }

  openNew() {
    this.stock = {
      id: null,
      product: null,
      branch: null,
      location: null,
      batch: null,
      quantity: 0,
      minimum_quantity: 0
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editStock(stock: any) {
    this.stock = { ...stock };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteStock(stock: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this stock entry?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.salesService.deleteStock(stock.id).subscribe({
          next: () => {
            this.loadStocks();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Stock deleted successfully'
            });
          },
          error: (error) => {
            console.error('Error deleting stock:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete stock'
            });
          }
        });
      }
    });
  }

  saveStock() {
    if (!this.stock.product) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Product is required'
      });
      return;
    }

    if (!this.stock.branch) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Branch is required'
      });
      return;
    }

    if (!this.stock.location) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Location is required'
      });
      return;
    }

    if (!this.stock.batch) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Batch is required'
      });
      return;
    }

    if (this.stock.quantity < 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Quantity cannot be negative'
      });
      return;
    }

    if (this.isEditMode) {
      this.salesService.updateStock(this.stock.id, this.stock).subscribe({
        next: () => {
          this.loadStocks();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock updated successfully'
          });
        },
        error: (error) => {
          console.error('Error updating stock:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update stock'
          });
        }
      });
    } else {
      this.salesService.createStock(this.stock).subscribe({
        next: () => {
          this.loadStocks();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock created successfully'
          });
        },
        error: (error) => {
          console.error('Error creating stock:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create stock'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }

  getName(list: any[], id: number): string {
    const item = list.find(i => i.value === id);
    return item ? item.label : 'N/A';
  }

  getStockSeverity(stock: any): any {
    if (stock.quantity <= stock.minimum_quantity) return 'danger';
    if (stock.quantity <= stock.minimum_quantity * 1.5) return 'warning';
    return 'success';
  }
}