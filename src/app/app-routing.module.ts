import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { AcountComponent } from 'src/app/acount/acount.component';
import { PaymentComponent } from 'src/app/payment/payment.component';

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

