import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'Categories',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/products/categories'
          },
          {
            label: 'Suppliers',
            icon: 'pi pi-fw pi-truck',
            routerLink: '/products/suppliers'
          },
          {
            label: 'Products',
            icon: 'pi pi-fw pi-shopping-bag',
            routerLink: '/products/products'
          }
        ]
      },
      {
        label: 'Sales',
        icon: 'pi pi-fw pi-chart-line',
        items: [
          {
            label: 'Batches',
            icon: 'pi pi-fw pi-qrcode',
            routerLink: '/sales/batches'
          },
          {
            label: 'Stock',
            icon: 'pi pi-fw pi-database',
            routerLink: '/sales/stocks'
          },
          {
            label: 'Movements',
            icon: 'pi pi-fw pi-arrows-h',
            routerLink: '/sales/movements'
          }
        ]
      },
      {
        label: 'Branches',
        icon: 'pi pi-fw pi-building',
        items: [
          {
            label: 'Branches',
            icon: 'pi pi-fw pi-home',
            routerLink: '/branches/branches'
          },
          {
            label: 'Warehouses',
            icon: 'pi pi-fw pi-warehouse',
            routerLink: '/branches/warehouses'
          },
          {
            label: 'Locations',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: '/branches/locations'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        routerLink: '/users/profiles'
      }
    ];
  }
}