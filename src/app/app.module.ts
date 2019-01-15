import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { DetailComponent } from './components/product_detail/product_detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AcountComponent } from './components/acount/acount.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from "./pipes/translate.pipe";
import { ProductService } from './services/product.service';
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import {BillingService} from "./services/cart.service";
import { SliderComponent } from './components/header/slider/slider.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComponent } from './components/header/login/login.component';
import { RegisterComponent } from './components/header/register/register.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//admin
import * as $ from "jquery";
import { UserComponent } from './components/admin/user/user.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { OrderComponent } from './components/admin/order/order.component';
import { OrderDetailComponent } from './components/admin/order-detail/order-detail.component';
import { ArtistComponent } from './components/admin/artist/artist.component';
import { AddArtistComponent } from './components/admin/add-artist/add-artist.component';
import { UpdateArtistComponent } from './components/admin/update-artist/update-artist.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { ManagerProductComponent } from './components/admin/product/product.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';

import { DataTablesModule } from 'angular-datatables';
import { FileSelectDirective } from 'ng2-file-upload';

/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    DetailComponent,
    CartComponent,
    AcountComponent,
    PaymentComponent,
    LoaderComponent,
    TranslatePipe,
    SliderComponent,
    LoginComponent,
    RegisterComponent,
    ManagerProductComponent,
    MenuComponent,
    ProductComponent,
    AddProductComponent,
    UserComponent,
    UpdateProductComponent,
    OrderComponent,
    OrderDetailComponent,
    ArtistComponent,
    AddArtistComponent,
    UpdateArtistComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule, 
    NgxPaginationModule,
    ToastrModule.forRoot()

  ],
  providers: [
		TranslateService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [ TranslateService ],
			multi: true
    }
    ,AuthService
    ,ProductService
    ,UserService
    ,BillingService
	],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
