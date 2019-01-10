import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
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
import { SliderComponent } from './components/header/slider/slider.component';

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
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
	],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
