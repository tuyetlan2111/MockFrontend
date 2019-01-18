import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@angular/router/src/events';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/models/cart_item';
import { IToastrService } from "../../services/toastr.service";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  total: number = 0;
  cartItems: any;
  count: number = 0;
  constructor(private http: HttpClient,
    private cartService: CartService,
    private iToastrService : IToastrService,
    private authService : AuthService,
    private router: Router,
    private productService : ProductService) { }

  ngOnInit() {
  
    this.cartService.getCartItems().then((data)=>{
        this.cartItems = data;
        this.getTotalPrice();
        console.log(this.cartItems);
    });
    console.log(this.cartItems);
  }

  
  getTotalPrice() {
    this.total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
  }

  deleteCartItem(cartItem) {
    console.log(cartItem)
    this.cartService.deleteCartItem(cartItem).then((data) => {
      this.ngOnInit();
    });
  }
  updateCartItemAdd(cartItem : CartItem) {
    console.log(cartItem)
    if(cartItem.quantity < 9){
      cartItem.quantity = cartItem.quantity +1
      this.cartService.updateCartItem(cartItem).then((data) => {
        this.cartService.getCartItems().then((data)=>{
          this.cartItems = data;
          this.getTotalPrice();
          console.log(this.cartItems);
  
        });
      });
    }else{
      this.iToastrService.showFail("Cannot Add item","The Maximum quanlity");
    }
  }
  updateCartItemMinus(cartItem : CartItem) {
    if(cartItem.quantity > 1){
      cartItem.quantity = cartItem.quantity -1
      this.cartService.updateCartItem(cartItem).then((data) => {
        this.cartService.getCartItems().then((data)=>{
          this.cartItems = data;
          this.getTotalPrice();
          console.log(this.cartItems);
  
        });
      });
    }else{
      this.iToastrService.showFail("Cannot Minus item","The minimum quanlity");
    }
    console.log(cartItem)
  }
  checkPayment(){
    if(!this.authService.isLoggedIn()){
      this.iToastrService.showFail("Cannot Check Out","Please login or register before check out");
    }else{
      this.router.navigate(["/payment"]);
    }
  }
}
