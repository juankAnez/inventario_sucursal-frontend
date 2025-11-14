import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BranchesService } from '../../../services/branches';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  templateUrl: './branches.html',
  styleUrl: './branches.css'
})
export class Branches implements OnInit {
  branches: any[] = [];
  loading: boolean = true;

  constructor(private branchesService: BranchesService) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.loading = true;
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        this.loading = false;
        console.log('Branches loaded:', data);
      },
      error: (error) => {
        console.error('Error loading branches:', error);
        this.loading = false;
      }
    });
  }
}