import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { UsersService } from '../../../services/users';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css'
})
export class Profiles implements OnInit {
  profiles: any[] = [];
  loading: boolean = true;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles() {
    this.loading = true;
    this.usersService.getProfiles().subscribe({
      next: (data) => {
        this.profiles = data;
        this.loading = false;
        console.log('Profiles loaded:', data);
      },
      error: (error) => {
        console.error('Error loading profiles:', error);
        this.loading = false;
      }
    });
  }
}