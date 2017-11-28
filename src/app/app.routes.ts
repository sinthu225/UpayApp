import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasketComponent } from './basket/basket.component';

import { ProductDetailsComponent } from './product-details/product-details.component'

export const router: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'basket', component: BasketComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);