import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { DetailComponent } from './components/product_detail/product_detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AcountComponent } from './components/acount/acount.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'acount', component: AcountComponent },
  { path: 'payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

