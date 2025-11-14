import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BranchesService } from '../../../services/branches';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  templateUrl: './warehouses.html',
  styleUrl: './warehouses.css'
})
export class Warehouses implements OnInit {
  warehouses: any[] = [];
  loading: boolean = true;

  constructor(private branchesService: BranchesService) {}

  ngOnInit() {
    this.loadWarehouses();
  }

  loadWarehouses() {
    this.loading = true;
    this.branchesService.getWarehouses().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.loading = false;
        console.log('Warehouses loaded:', data);
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.loading = false;
      }
    });
  }
}