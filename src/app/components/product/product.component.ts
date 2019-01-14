import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from "../../services/product.service";
import { BillingService } from "../../services/cart.service";
import { Product } from '../../models/product';
import { IToastrService } from '../../services/toastr.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[];
  product: any;
  flag = true;
  constructor(
    private http: HttpClient,
    public productService: ProductService,
    private toastrService: IToastrService,
    private billdingService: BillingService,
  ) { }
  ngOnInit() {
    this.productService.getProducts().then(() => {
      this.products = this.productService.products;
    })
    this.showConfig();
  }

  configUrl = 'http://localhost:8080/product/show';
  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.getConfig()
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
      });
  }

  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }
  cartItem: any;
  listCartItem: any = [];
  addProductToCart(p) {
    // this.flag = true;
    // for (var i = 0; i < this.cartItem.length; i++) {
    //   if (p.id === this.cartItem[i].id){
    //     this.flag = false;
    //     this.cartItem[i].quantity++;
    //     this.cartItem[i].totalPrice = this.cartItem[i].price * this.cartItem[i].quantity;
    //   } 
    // }

    if (this.flag == true) {
      this.cartItem = {
        price: p.price,
        quantity: 1,
        createdOn: "2018-12-31T17:00:00.000+0000",
        createdBy: 1,
        changedOn: "2018-12-31T17:00:00.000+0000",
        changedBy: 1,
        product: {
          id: p.id,
        },
        cart: {
          id: 1,
        }
      }

    }
    this.billdingService.addProduct(this.cartItem)
      .subscribe(item => this.listCartItem.push(item));
  }
}
