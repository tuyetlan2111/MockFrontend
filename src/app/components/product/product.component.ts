import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { Product } from '../../models/product';
import { Cart } from '../../models/cart';
import { RestService } from './../../rest.service';
import { IToastrService } from '../../services/toastr.service';
import { CartItem } from 'src/app/models/cart_item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[];
  searchItem : string;
  artists:any = [];
  product: any;
  flag = true;
  constructor(
    public rest: RestService, 
    private http: HttpClient,
    public productService: ProductService,
    private toastrService: IToastrService,
    private cartService: CartService,
  ) { }
  ngOnInit() {
    this.getProducts();
    this.getArtist();
  
  }

  getProducts() {
    this.productService.getProducts().then((data)=>{
      this.product = data;
    })
  }
  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }

  cartItem: any;
  listCartItem: any = [];

  addProductToCart(product) {
    //check cart
    this.cartService.checkAndSetCart().then((data) => {

        this.addItemCart(data, product)
    }); 
  }
  addItemCart(cart: Cart, product: Product){
    var cartItem :CartItem ={}
    cartItem.cart=  cart;
    cartItem.cartId = cart.id;
    cartItem.productId = product.id;
    cartItem.price = product.price;
    cartItem.quantity = 1;
    cartItem.changedOn = new Date();
    cartItem.changedBy = 1;
    cartItem.createdOn = new Date();
    cartItem.createdBy = 1;
    cartItem.product = product;
    this.cartService.checkAndSetCartItem(cartItem).then((data) => {

  }); 
  }
  getArtist(){
    this.artists = [];
    this.rest.getArtist().subscribe((data: {}) => {
      this.artists = data;

    });
  }


}
