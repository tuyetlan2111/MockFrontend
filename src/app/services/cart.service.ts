
import { Injectable } from "@angular/core";
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { IToastrService } from '../services/toastr.service';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/models/cart_item';
import { Product } from 'src/app/models/product';
@Injectable({
  providedIn: "root"
})
export class CartService {
  	// NavbarCounts
	navbarCartCount = 0;
  COOKIE_CART="cookieCart";
  cartItems: CartItem[] = [];
  cart: Cart = {}
  
  constructor(private http: HttpClient, 
              private rest :RestService,
              private iToastrService :IToastrService,
              private cookieService: CookieService) {  
      if(!this.cookieService.check(this.COOKIE_CART)){
        this.createNewCookie();
      }
      this.getCartItems();
      console.log(this.cookieService.get(this.COOKIE_CART));
     }
    getCookie(): String{
      return this.cookieService.get(this.COOKIE_CART);
    }
    createNewCookie(){
      this.cookieService.set( this.COOKIE_CART, new Date().getTime() + "");
    }
  checkAndSetCart() : Promise<{}> {
    //return cart exit
    if(this.cart.id > 0){
      new Promise<{}>((resolve, reject) => {resolve(this.cart)});
    }else{
      this.cart.cookie = this.cookieService.get(this.COOKIE_CART)
      this.cart.cartDate = new Date();
      this.cart.changedOn = new Date();
      this.cart.createdOn = new Date();
      this.cart.createdBy = 1;
      this.cart.orderDate = new Date();

      return new Promise<{}>((resolve, reject) => {
              this.rest.checkAndSetCart(this.cart).subscribe((data: {}) => {
                console.log(JSON.stringify(data));
                if(JSON.stringify(data) == "{}"){
                  console.log("data");
                  resolve(null);
                }else{
                  resolve(data);
                }
                reject();
              });
        });
    }
  }
  checkAndSetCartItem(cartItem: CartItem): Promise<{}>{
    return new Promise<{}>((resolve, reject) => {
      this.rest.checkAndSetCartItem(cartItem).subscribe((data: {}) => {
        console.log(JSON.stringify(data));
        if(JSON.stringify(data) == "{}"){
          console.log("data");
          resolve(null);
        }else{
          this.iToastrService.showSuccess("Add to Cart done !!",cartItem.product.title)
          this.getCartItems();
          resolve(data);
        }
        reject();
      });
    });
  }

	// Fetching Locat CartsProducts
	calculateLocalCartProdCounts(){
	
			var sum = 0;
			this.cartItems.forEach(element => {
				sum+= (element.quantity);
			});

			this.navbarCartCount = sum
  
	}

	getCartItems(): Promise<{}> {
    
		return new Promise<{}>((resolve, reject) => {
			this.rest.getCartItems(this.cookieService.get(this.COOKIE_CART)).subscribe((data: {}) => {
        this.cartItems = <CartItem[]>data;
        this.calculateLocalCartProdCounts();
        resolve(this.cartItems);
        
			});
		});
	}


  deleteCartItem(cartItem): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
			this.rest.deleteCartItem(cartItem).subscribe((data: {}) => {
        this.getCartItems().then((data_)=>{
          this.cartItems = <CartItem[]>data_;
          resolve(this.cartItems);
        })
			});
		});
  }

  updateCartItem(cartItem): Promise<{}>  {
    
    return new Promise<{}>((resolve, reject) => {
			this.rest.updateCartItem(cartItem).subscribe((data: {}) => {
        this.getCartItems().then((data_)=>{
          this.cartItems = <CartItem[]>data_;
          resolve(this.cartItems);
        })
			});
		});
  }
}
