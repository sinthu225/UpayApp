import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BasketComponent } from './basket/basket.component';
import { AddProductComponent } from './add-product/add-product.component'

import { ProductDetailsComponent } from './product-details/product-details.component';
import { SignupComponent } from './signup/signup.component'
import { EmailComponent } from './email/email.component'

export const router: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'login-email', component: EmailComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'basket', component: BasketComponent},
    { path: 'add-product', component: AddProductComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);