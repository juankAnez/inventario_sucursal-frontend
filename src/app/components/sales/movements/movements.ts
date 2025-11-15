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
  selector: 'app-movements',
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
  templateUrl: './movements.html',
  styleUrl: './movements.css'
})
export class Movements implements OnInit {
  movements: any[] = [];
  products: any[] = [];
  branches: any[] = [];
  locations: any[] = [];
  batches: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  
  movementTypes = [
    { label: 'In', value: 'IN' },
    { label: 'Out', value: 'OUT' },
    { label: 'Adjustment', value: 'ADJUSTMENT' }
  ];
  
  movement: any = {
    id: null,
    product: null,
    branch: null,
    location: null,
    batch: null,
    movement_type: null,
    quantity: 0,
    reason: '',
    user: 1 // Default user ID, should come from auth system
  };

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    private branchesService: BranchesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadMovements();
    this.loadProducts();
    this.loadBranches();
    this.loadLocations();
    this.loadBatches();
  }

  loadMovements() {
    this.loading = true;
    this.salesService.getMovements().subscribe({
      next: (data) => {
        this.movements = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load movements'
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
    this.movement = {
      id: null,
      product: null,
      branch: null,
      location: null,
      batch: null,
      movement_type: null,
      quantity: 0,
      reason: '',
      user: 1
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editMovement(movement: any) {
    this.movement = { ...movement };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteMovement(movement: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this movement?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.salesService.deleteMovement(movement.id).subscribe({
          next: () => {
            this.loadMovements();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Movement deleted successfully'
            });
          },
          error: (error) => {
            console.error('Error deleting movement:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete movement'
            });
          }
        });
      }
    });
  }

  saveMovement() {
    if (!this.movement.product) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Product is required'
      });
      return;
    }

    if (!this.movement.branch) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Branch is required'
      });
      return;
    }

    if (!this.movement.location) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Location is required'
      });
      return;
    }

    if (!this.movement.batch) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Batch is required'
      });
      return;
    }

    if (!this.movement.movement_type) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Movement type is required'
      });
      return;
    }

    if (this.movement.quantity <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Quantity must be greater than 0'
      });
      return;
    }

    if (!this.movement.reason.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Reason is required'
      });
      return;
    }

    if (this.isEditMode) {
      this.salesService.updateMovement(this.movement.id, this.movement).subscribe({
        next: () => {
          this.loadMovements();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Movement updated successfully'
          });
        },
        error: (error) => {
          console.error('Error updating movement:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update movement'
          });
        }
      });
    } else {
      this.salesService.createMovement(this.movement).subscribe({
        next: () => {
          this.loadMovements();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Movement created successfully'
          });
        },
        error: (error) => {
          console.error('Error creating movement:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create movement'
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

  getMovementSeverity(type: string): any {
    switch(type) {
      case 'IN': return 'success';
      case 'OUT': return 'danger';
      case 'ADJUSTMENT': return 'warning';
      default: return 'info';
    }
  }
}