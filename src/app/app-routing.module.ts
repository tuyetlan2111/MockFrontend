import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { DetailComponent } from './components/product_detail/product_detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AcountComponent } from './components/acount/acount.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ManagerProductComponent } from './components/admin/product/product.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { UserComponent } from './components/admin/user/user.component';
import { AddArtistComponent } from './components/admin/add-artist/add-artist.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { OrderComponent } from './components/admin/order/order.component';
import { OrderDetailComponent } from './components/admin/order-detail/order-detail.component';
import { ArtistComponent } from './components/admin/artist/artist.component';
import { UpdateArtistComponent } from 'src/app/components/admin/update-artist/update-artist.component';



const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'acount', component: AcountComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'admin', component: ManagerProductComponent},
  { path: 'admin/add_product', component: AddProductComponent },
  { path: 'admin/show_user', component: UserComponent },
  { path: 'admin/add_artist', component: AddArtistComponent },
  { path: 'admin/update_product/:id', component: UpdateProductComponent },
  { path: 'admin/update_artist/:id', component: UpdateArtistComponent },
  { path: 'admin/order', component: OrderComponent },
  { path: 'admin/order_detail/:id', component: OrderDetailComponent },
  { path: 'admin/artist', component: ArtistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

