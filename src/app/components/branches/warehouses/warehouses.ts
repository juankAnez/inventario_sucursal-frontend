import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BranchesService } from '../../../services/branches';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './warehouses.html',
  styleUrl: './warehouses.css'
})
export class Warehouses implements OnInit {
  warehouses: any[] = [];
  branches: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  warehouse: any = {
    id: null,
    code: '',
    name: '',
    description: '',
    branch: null
  };

  constructor(
    private branchesService: BranchesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadWarehouses();
    this.loadBranches();
  }

  loadWarehouses() {
    this.loading = true;
    this.branchesService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las bodegas'
        });
        this.loading = false;
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

  openNew() {
    this.warehouse = {
      id: null,
      code: '',
      name: '',
      description: '',
      branch: null
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editWarehouse(warehouse: any) {
    this.warehouse = { ...warehouse };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteWarehouse(warehouse: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la bodega "${warehouse.name}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.branchesService.deleteWarehouse(warehouse.id).subscribe({
          next: () => {
            this.loadWarehouses();
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Bodega eliminada exitosamente'
            });
          },
          error: (error) => {
            console.error('Error deleting warehouse:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la bodega'
            });
          }
        });
      }
    });
  }

  saveWarehouse() {
    if (!this.warehouse.code?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El código es requerido'
      });
      return;
    }

    if (!this.warehouse.name?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre es requerido'
      });
      return;
    }

    if (!this.warehouse.branch) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La sucursal es requerida'
      });
      return;
    }

    if (this.isEditMode) {
      this.branchesService.updateWarehouse(this.warehouse.id, this.warehouse).subscribe({
        next: () => {
          this.loadWarehouses();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Bodega actualizada exitosamente'
          });
        },
        error: (error) => {
          console.error('Error updating warehouse:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la bodega'
          });
        }
      });
    } else {
      this.branchesService.createWarehouse(this.warehouse).subscribe({
        next: () => {
          this.loadWarehouses();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Bodega creada exitosamente'
          });
        },
        error: (error) => {
          console.error('Error creating warehouse:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la bodega'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }

  getBranchName(branchId: number): string {
    const branch = this.branches.find(b => b.value === branchId);
    return branch ? branch.label : 'N/A';
  }
}