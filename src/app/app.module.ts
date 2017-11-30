import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';

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
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';


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
    SpinnerComponent,
    SearchComponent,
    ProductDetailsComponent,
    AddProductComponent,
    SignupComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'Upay-app'),
    AngularFirestoreModule.enablePersistence(),
    CoreModule,
    routes,
    FormsModule
  ],
  providers: [AuthService, Ratingservice, Productservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
