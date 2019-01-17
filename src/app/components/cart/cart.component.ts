import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@angular/router/src/events';
import { BillingService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


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
    private billdingService: BillingService,
    private productService : ProductService) { }

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    this.billdingService.getConfig().subscribe(data => {
      this.cartItems = data;
      console.log(this.cartItems);
      this.totalPrice();
      
    });
  }
  
  totalPrice(): Promise<{}> {
    return new Promise<{}>((resolve, reject) => { 
      this.total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
    this.productService.calculateLocalCartProdCounts();
  })
  }

  deleteProductToCart(cartItem) {
    this.billdingService.deleteProduct(cartItem.id).subscribe(data => {
      this.showConfig();
    });
  }

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
    this.billdingService.updateProduct(this.cartItem)
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
      this.billdingService.updateProduct(this.cartItem)
        .subscribe(item => {
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
      this.billdingService.updateProduct(this.cartItem)
        .subscribe(item => {
          this.listCartItem.push(item);
          this.showConfig();
        });
    }
  }
}
