import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SalesService } from '../../../services/sales';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  templateUrl: './batches.html',
  styleUrl: './batches.css'
})
export class Batches implements OnInit {
  batches: any[] = [];
  loading: boolean = true;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadBatches();
  }

  loadBatches() {
    this.loading = true;
    this.salesService.getBatches().subscribe({
      next: (data) => {
        this.batches = data;
        this.loading = false;
        console.log('Batches loaded:', data);
      },
      error: (error) => {
        console.error('Error loading batches:', error);
        this.loading = false;
      }
    });
  }
}