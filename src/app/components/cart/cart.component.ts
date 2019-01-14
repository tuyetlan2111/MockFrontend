import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@angular/router/src/events';
import { BillingService } from 'src/app/services/cart.service';


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
    private service: BillingService) { }

  ngOnInit() {
    this.showConfig();
  }
  configUrl = 'http://localhost:8080/cartItem/show';
  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.getConfig()
      .subscribe(data => {
        this.cartItems = data;
        console.log(this.cartItems);
        this.totalPrice();
      });
  }
  totalPrice() {
    this.total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
  }

  deleteProductToCart(cartItem) {
    this.service.deleteProduct(cartItem.id).subscribe(data => {
      this.showConfig();
    });
  }

  // updateProductToCart(cartItem){
  //   this.service.updateProduct(cartItem).subscribe(data => {
  //     this.showConfig();
  //   }); 
  // }

  cartItem: any;
  listCartItem: any = [];
  updateProductToCart(p) {
    this.cartItem = {
      id: p.id,
      price: p.price,
      quantity: p.quantity,
      createdOn: p.createdOn,
      createdBy: p.createdBy,
      changedOn: p.changedOn,
      changedBy: p.changedBy,
      product: {
        id: p.product.id,
      },
      cart: {
        id: p.cart.id,
      }
    }
    this.service.updateProduct(this.cartItem)
      .subscribe(item => {
        this.listCartItem.push(item);
        this.showConfig();
      });
  }

  plusUpdateProductToCart(p) {
    if (p.quantity < 100) {
      this.cartItem = {
        id: p.id,
        price: p.price,
        quantity: p.quantity + 1,
        createdOn: p.createdOn,
        createdBy: p.createdBy,
        changedOn: p.changedOn,
        changedBy: p.changedBy,
        product: {
          id: p.product.id,
        },
        cart: {
          id: p.cart.id,
        }
      }
      this.service.updateProduct(this.cartItem)
        .subscribe(item => {
          this.listCartItem.push(item);
          this.showConfig();
        });
    }
  }
  minUpdateProductToCart(p) {
    if (p.quantity > 1) {
      this.cartItem = {
        id: p.id,
        price: p.price,
        quantity: p.quantity - 1,
        createdOn: p.createdOn,
        createdBy: p.createdBy,
        changedOn: p.changedOn,
        changedBy: p.changedBy,
        product: {
          id: p.product.id,
        },
        cart: {
          id: p.cart.id,
        }
      }
      this.service.updateProduct(this.cartItem)
        .subscribe(item => {
          this.listCartItem.push(item);
          this.showConfig();
        });
    }
  }
}
