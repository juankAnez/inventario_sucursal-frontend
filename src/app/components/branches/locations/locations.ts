import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BranchesService } from '../../../services/branches';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {
  locations: any[] = [];
  loading: boolean = true;

  constructor(private branchesService: BranchesService) {}

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.loading = true;
    this.branchesService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        this.loading = false;
        console.log('Locations loaded:', data);
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.loading = false;
      }
    });
  }
}