import { Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UpdateProductComponent } from './core/components/update-product/update-product.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'updateProduct/:id',
    component: UpdateProductComponent
  },
];
