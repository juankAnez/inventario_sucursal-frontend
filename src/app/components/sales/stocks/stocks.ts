import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { SalesService } from '../../../services/sales';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, Tag],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css'
})
export class Stocks implements OnInit {
  stocks: any[] = [];
  loading: boolean = true;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.loading = true;
    this.salesService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.loading = false;
        console.log('Stocks loaded:', data);
      },
      error: (error) => {
        console.error('Error loading stocks:', error);
        this.loading = false;
      }
    });
  }

  getStockSeverity(stock: any): any {
    if (stock.quantity <= stock.minimum_quantity) return 'danger';
    if (stock.quantity <= stock.minimum_quantity * 1.5) return 'warning';
    return 'success';
}
}