import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { SalesService } from '../../../services/sales';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, Tag],
  templateUrl: './movements.html',
  styleUrl: './movements.css'
})
export class Movements implements OnInit {
  movements: any[] = [];
  loading: boolean = true;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadMovements();
  }

  loadMovements() {
    this.loading = true;
    this.salesService.getMovements().subscribe({
      next: (data) => {
        this.movements = data;
        this.loading = false;
        console.log('Movements loaded:', data);
      },
      error: (error) => {
        console.error('Error loading movements:', error);
        this.loading = false;
      }
    });
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