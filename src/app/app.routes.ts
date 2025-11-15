import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Categories } from './components/products/categories/categories';
import { Suppliers } from './components/products/suppliers/suppliers';
import { Products } from './components/products/products/products';
import { Batches } from './components/sales/batches/batches';
import { Stocks } from './components/sales/stocks/stocks';
import { Movements } from './components/sales/movements/movements';
import { Branches } from './components/branches/branches/branches';
import { Warehouses } from './components/branches/warehouses/warehouses';
import { Locations } from './components/branches/locations/locations';
import { Profiles } from './components/users/profiles/profiles';

export const routes: Routes = [
  // Dashboard como página principal
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  
  // Products
  { path: 'products/categories', component: Categories },
  { path: 'products/suppliers', component: Suppliers },
  { path: 'products/products', component: Products },
  
  // Sales
  { path: 'sales/batches', component: Batches },
  { path: 'sales/stocks', component: Stocks },
  { path: 'sales/movements', component: Movements },
  
  // Branches
  { path: 'branches/branches', component: Branches },
  { path: 'branches/warehouses', component: Warehouses },
  { path: 'branches/locations', component: Locations },
  
  // Users
  { path: 'users/profiles', component: Profiles }
];