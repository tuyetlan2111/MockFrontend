import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Rating } from '../../models/rating';
import { ProductService } from "../../services/product.service";
import { Product } from '../../models/product';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart_item';
import { User } from '../../models/user';
import { IToastrService } from '../../services/toastr.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-detail',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() fatherName: string;
  constructor(private http: HttpClient, 
    private router: Router ,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService : IToastrService,
    private authService : AuthService,
    private cartService: CartService,

  ) { 
  }
  flag = true;
  id ; product; number = 1; ratings;star = 0;
  rating : Rating = {}; user: User; review ="";
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getDetailProduct(this.id);
    this.getRatingProduct(this.id +"");
  }
  getDetailProduct(id){
    this.productService.getProduct(id).then(() => {
      this.product = this.productService.productCurrent;
      console.log(this.product,"product")
     })
  }

  addProductToCart(product){
    //check cart
    this.cartService.checkAndSetCart().then((data) => {
      console.log(data);
      this.addItemCart(data, product)
    }); 
   }
   
  addItemCart(cart: Cart, product: Product){
    var cartItem :CartItem ={}
    cartItem.cart=  cart;
    cartItem.cartId = cart.id;
    cartItem.productId = product.id;
    cartItem.price = product.price;
    cartItem.quantity = this.number;
    cartItem.changedOn = new Date();
    cartItem.changedBy = 1;
    cartItem.createdOn = new Date();
    cartItem.createdBy = 1;
    cartItem.product = product;
    this.cartService.checkAndSetCartItem(cartItem).then((data) => {
      console.log(data);
  }); 
  }
   addNumber(){
     if(this.number <10)
      this.number++;
   }
   mineNumber(){
    if(this.number > 1)
    this.number--;
   }

   getRatingProduct(id){
    this.productService.getRatingProduct(id).then(() => {
      this.ratings = this.productService.ratingsCurrent;
     })
   }
   
   addRatingProduct(review){
     this.user = this.authService.user;
     console.log(this.user)
     if(this.user == null){
      this.toastrService.showFail("Please login to rating product","Rating fail require login"); 
      return;
     }
     if(this.star == 0){
      this.toastrService.showFail("Please check rating product","Rating fail require add star"); 
      return;
     }
     this.rating.user = this.user;
     this.rating.stars = this.star;
     this.rating.content =  review + "";
     this.rating.product = this.product
     this.rating.createdBy = this.user.id;
     this.rating.changedBy = this.user.id;
     this.rating.createdOn =  new Date();
     this.rating.changedOn =  new Date();

     console.log(this.rating)
      this.productService.addRatingProduct(this.rating).then((data) => {
      if(JSON.stringify(data) == "{}"){
        this.toastrService.showFail("Rating on product fail","Rating fail order or review first"); 
      }else{
        this.toastrService.showSuccess("Rating on product susscess full!!","Rating done"); 
        this.getRatingProduct(this.id +"");
      }

     })
  }
  setStar(star){
    //this.rating.stars = star
    this.star = star;
    console.log(star)
  }

}
