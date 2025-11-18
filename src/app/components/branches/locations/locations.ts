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
  selector: 'app-locations',
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
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {
  locations: any[] = [];
  warehouses: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  location: any = {
    id: null,
    code: '',
    description: '',
    warehouse: null
  };

  constructor(
    private branchesService: BranchesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadLocations();
    this.loadWarehouses();
  }

  loadLocations() {
    this.loading = true;
    this.branchesService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las ubicaciones'
        });
        this.loading = false;
      }
    });
  }

  loadWarehouses() {
    this.branchesService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data.map((warehouse: any) => ({
          label: warehouse.name,
          value: warehouse.id
        }));
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
      }
    });
  }

  openNew() {
    this.location = {
      id: null,
      code: '',
      description: '',
      warehouse: null
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editLocation(location: any) {
    this.location = { ...location };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteLocation(location: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la ubicación "${location.code}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.branchesService.deleteLocation(location.id).subscribe({
          next: () => {
            this.loadLocations();
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Ubicación eliminada exitosamente'
            });
          },
          error: (error) => {
            console.error('Error deleting location:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la ubicación'
            });
          }
        });
      }
    });
  }

  saveLocation() {
    if (!this.location.code?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El código es requerido'
      });
      return;
    }

    if (!this.location.warehouse) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La bodega es requerida'
      });
      return;
    }

    if (this.isEditMode) {
      this.branchesService.updateLocation(this.location.id, this.location).subscribe({
        next: () => {
          this.loadLocations();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Ubicación actualizada exitosamente'
          });
        },
        error: (error) => {
          console.error('Error updating location:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la ubicación'
          });
        }
      });
    } else {
      this.branchesService.createLocation(this.location).subscribe({
        next: () => {
          this.loadLocations();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Ubicación creada exitosamente'
          });
        },
        error: (error) => {
          console.error('Error creating location:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la ubicación'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }

  getWarehouseName(warehouseId: number): string {
    const warehouse = this.warehouses.find(w => w.value === warehouseId);
    return warehouse ? warehouse.label : 'N/A';
  }
}