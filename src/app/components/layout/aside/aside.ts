import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
  encapsulation: ViewEncapsulation.None  // ← ESTA LÍNEA ES CLAVE
})
export class Aside {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Panel',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'Categorias',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/products/categories'
          },
          {
            label: 'Provedores',
            icon: 'pi pi-fw pi-truck',
            routerLink: '/products/suppliers'
          },
          {
            label: 'Productos',
            icon: 'pi pi-fw pi-shopping-bag',
            routerLink: '/products/products'
          }
        ]
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-chart-line',
        items: [
          {
            label: 'Lotes',
            icon: 'pi pi-fw pi-qrcode',
            routerLink: '/sales/batches'
          },
          {
            label: 'Stock',
            icon: 'pi pi-fw pi-database',
            routerLink: '/sales/stocks'
          },
          {
            label: 'Movimientos',
            icon: 'pi pi-fw pi-arrows-h',
            routerLink: '/sales/movements'
          }
        ]
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-fw pi-building',
        items: [
          {
            label: 'Sucursal',
            icon: 'pi pi-fw pi-home',
            routerLink: '/branches/branches'
          },
          {
            label: 'Almacenes',
            icon: 'pi pi-fw pi-warehouse',
            routerLink: '/branches/warehouses'
          },
          {
            label: 'Ubicaciones',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: '/branches/locations'
          }
        ]
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: '/users/profiles'
      }
    ];
  }
}