import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from './core/auth.service';
import { Productservice } from './products.service';

import { routes } from './app.routes';


//environment config file
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { Ratingservice } from './star.service';
import { ReviewPanelComponent } from './review-panel/review-panel.component';
import { BasketComponent } from './basket/basket.component';
import { BasketInfoComponent } from './basket-info/basket-info.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ProductsComponent,
    ProductSingleComponent,
    ReviewPanelComponent,
    BasketComponent,
    BasketInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'Upay-app'),
    CoreModule,
    routes
  ],
  providers: [AuthService, Ratingservice, Productservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
