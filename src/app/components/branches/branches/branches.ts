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
  selector: 'app-branches',
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
  templateUrl: './branches.html',
  styleUrl: './branches.css'
})
export class Branches implements OnInit {
  branches: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  branch: any = {
    id: null,
    code: '',
    name: '',
    address: '',
    phone: '',
    manager: ''
  };

  constructor(
    private branchesService: BranchesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.loading = true;
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading branches:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las sucursales'
        });
        this.loading = false;
      }
    });
  }

  openNew() {
    this.branch = {
      id: null,
      code: '',
      name: '',
      address: '',
      phone: '',
      manager: ''
    };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editBranch(branch: any) {
    this.branch = { ...branch };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteBranch(branch: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar la sucursal "${branch.name}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.branchesService.deleteBranch(branch.id).subscribe({
          next: () => {
            this.loadBranches();
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'Sucursal eliminada exitosamente'
            });
          },
          error: (error) => {
            console.error('Error deleting branch:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la sucursal'
            });
          }
        });
      }
    });
  }

  saveBranch() {
    // Validaciones
    if (!this.branch.code?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El código es requerido'
      });
      return;
    }

    if (!this.branch.name?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre es requerido'
      });
      return;
    }

    if (this.isEditMode) {
      // Actualizar
      this.branchesService.updateBranch(this.branch.id, this.branch).subscribe({
        next: () => {
          this.loadBranches();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Sucursal actualizada exitosamente'
          });
        },
        error: (error) => {
          console.error('Error updating branch:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la sucursal'
          });
        }
      });
    } else {
      // Crear
      this.branchesService.createBranch(this.branch).subscribe({
        next: () => {
          this.loadBranches();
          this.displayDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Creado',
            detail: 'Sucursal creada exitosamente'
          });
        },
        error: (error) => {
          console.error('Error creating branch:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la sucursal'
          });
        }
      });
    }
  }

  hideDialog() {
    this.displayDialog = false;
  }
}